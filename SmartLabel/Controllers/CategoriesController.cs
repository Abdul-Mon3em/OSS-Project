using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartLabel.labelData;
using SmartLabel.models;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace SmartLabel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly string _imagePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");

        public CategoriesController(AppDbContext db)
        {
            _db = db;
        }

        // Helper method to build full image URL
        private string BuildImageUrl(string imagePath)
        {
            if (!string.IsNullOrEmpty(imagePath))
            {
                return $"{Request.Scheme}://{Request.Host}/images/{Path.GetFileName(imagePath)}";
            }
            return null;
        }

        // POST: api/Category
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddCategory([FromForm] CategoryModel catModel)
        {
            if (catModel == null)
            {
                return BadRequest("Category data is required.");
            }

            var category = new Category
            {
                Name = catModel.Name,
                Descount =  0, // Default to 0 if Descount is not provided
            };

            if (catModel.Image != null)
            {
                var fileName = Path.GetFileName(catModel.Image.FileName);
                var filePath = Path.Combine("images", fileName);  // Store relative path

                // Ensure the images directory exists
                var fullPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", filePath);
                Directory.CreateDirectory(Path.GetDirectoryName(fullPath));

                using (var fileStream = new FileStream(fullPath, FileMode.Create))
                {
                    await catModel.Image.CopyToAsync(fileStream);
                }

                // Save only the relative file path
                category.ImagePath = filePath;
            }

            if (ModelState.IsValid)
            {
                await _db.Categories.AddAsync(category);
                await _db.SaveChangesAsync();
                return CreatedAtAction(nameof(GetCategoryById), new { id = category.Id }, category);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        // GET: api/Category
        [HttpGet]
        public IActionResult GetCategories()
        {
            var categories = _db.Categories.ToList();

            if (categories == null || !categories.Any())
            {
                return NotFound("No Categories found.");
            }

            // Build full image URL for each category
            foreach (var category in categories)
            {
                category.ImagePath = BuildImageUrl(category.ImagePath);
            }

            return Ok(categories);
        }

        // GET: api/Category/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategoryById(int id)
        {
            var category = await _db.Categories.FindAsync(id);

            if (category == null)
            {
                return NotFound($"Category with ID {id} not found.");
            }

            // Build full image URL if image exists
            category.ImagePath = BuildImageUrl(category.ImagePath);

            return Ok(category);
        }

        // PUT: api/Category/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateCategory(int id, [FromForm] CategoryModel catModel)
        {
            if (catModel == null || id <= 0)
            {
                return BadRequest("Category data is invalid.");
            }

            var existingCategory = await _db.Categories.FindAsync(id);
            if (existingCategory == null)
            {
                return NotFound($"Category with ID {id} not found.");
            }

            existingCategory.Name = catModel.Name;
            existingCategory.Descount =  0; // Default value for Descount if not provided

            // Handle image update 
            if (catModel.Image != null)
            {
                var fileName = Path.GetFileName(catModel.Image.FileName);
                var filePath = Path.Combine("images", fileName);  // Store relative path

                // Ensure the images directory exists
                var fullPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", filePath);
                Directory.CreateDirectory(Path.GetDirectoryName(fullPath));

                using (var fileStream = new FileStream(fullPath, FileMode.Create))
                {
                    await catModel.Image.CopyToAsync(fileStream);
                }

                // Save only the relative file path
                existingCategory.ImagePath = filePath;
            }

            try
            {
                _db.Categories.Update(existingCategory);
                await _db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_db.Categories.Any(c => c.Id == id))
                {
                    return NotFound($"Category with ID {id} not found.");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Category/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var category = await _db.Categories.FindAsync(id);

            if (category == null)
            {
                return NotFound($"no products ander that category");
            }

            _db.Categories.Remove(category);
            await _db.SaveChangesAsync();

            return NoContent();
        }
    }
}

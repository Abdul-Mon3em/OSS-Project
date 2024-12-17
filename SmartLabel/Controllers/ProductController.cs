using Microsoft.AspNetCore.Authorization;
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
    public class ProductController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly string _imagePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");

        public ProductController(AppDbContext db)
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

        // GET: api/Product
        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var products = await _db.Products.Include(p => p.Category).ToListAsync();

            // Build full image URL for each product
            foreach (var product in products)
            {
                product.ImagePath = BuildImageUrl(product.ImagePath);
            }

            return Ok(products);
        }

        // GET: api/Product/Category/5
        [HttpGet("Category/{categoryId}")]
        public async Task<IActionResult> GetProductsByCategory(int categoryId)
        {
            var categoryExists = await _db.Categories.AnyAsync(c => c.Id == categoryId);
            if (!categoryExists)
                return NotFound("Category not found");

            var products = await _db.Products
                                    .Include(p => p.Category)
                                    .Where(p => p.CategoryId == categoryId)
                                    .ToListAsync();

            // Build full image URL for each product
            foreach (var product in products)
            {
                product.ImagePath = BuildImageUrl(product.ImagePath);
            }

            return Ok(products);
        }

        // GET: api/Product/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var product = await _db.Products.Include(p => p.Category).FirstOrDefaultAsync(p => p.Id == id);
            if (product == null)
                return NotFound("Product not found");

            // Build full image URL
            product.ImagePath = BuildImageUrl(product.ImagePath);

            return Ok(product);
        }

        // GET: api/Product/search?Productname=milk
        [HttpGet("search")]
        public async Task<IActionResult> GetProductsByNameSubstring([FromQuery] string productName)
        {
            if (string.IsNullOrWhiteSpace(productName))
                return BadRequest("The name substring cannot be empty.");

            var products = await _db.Products
                                    .Include(p => p.Category)
                                    .Where(p => EF.Functions.Like(p.Name, $"%{productName}%"))
                                    .ToListAsync();

            // Check if any products match
            if (products == null || !products.Any())
                return NotFound($"No products found containing '{productName}' in their name.");

            // Build full image URL for each product
            foreach (var product in products)
            {
                product.ImagePath = BuildImageUrl(product.ImagePath);
            }

            return Ok(products);
        }

        // POST: api/Product
        [HttpPost]
        [Authorize(Roles = "Admin")]  // Only Admin role can add products
        public async Task<IActionResult> AddProduct([FromForm] ProductModel productModel)
        {
            if (productModel == null)
                return BadRequest("Product data is null");

            var categoryExists = await _db.Categories.AnyAsync(c => c.Id == productModel.CategoryId);
            if (!categoryExists)
                return NotFound("Category not found");

            // Map ProductModel to Product
            var product = new Product
            {
                Name = productModel.Name,
                Price = productModel.Price,
                Discount = productModel.Discount,
                ExpirationDate = productModel.ExpirationDate,
                CategoryId = productModel.CategoryId
            };

            if (productModel.Image != null)
            {
                // Generate a unique filename to avoid filename conflicts
                var fileName = Path.GetFileName(productModel.Image.FileName);
                var filePath = Path.Combine("images", fileName); // Store relative path

                // Ensure the images directory exists
                var fullPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", filePath);
                Directory.CreateDirectory(Path.GetDirectoryName(fullPath));

                using (var fileStream = new FileStream(fullPath, FileMode.Create))
                {
                    await productModel.Image.CopyToAsync(fileStream);
                }

                // Save only the relative file path
                product.ImagePath = filePath;
            }

            await _db.Products.AddAsync(product);
            await _db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProductById), new { id = product.Id }, product);
        }

        // PUT: api/Product/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]  // Only Admin role can update products
        public async Task<IActionResult> UpdateProduct(int id, [FromForm] ProductModel productModel)
        {
            if (productModel == null)
                return BadRequest("Product data is null");

            var product = await _db.Products.FindAsync(id);
            if (product == null)
                return NotFound("Product not found");

            var categoryExists = await _db.Categories.AnyAsync(c => c.Id == productModel.CategoryId);
            if (!categoryExists)
                return NotFound("Category not found");

          
            product.Name = productModel.Name;
            product.Price = productModel.Price;
            product.Discount = productModel.Discount;
            product.ExpirationDate = productModel.ExpirationDate;
            product.CategoryId = productModel.CategoryId;

            if (productModel.Image != null)
            {
                
                var fileName = Path.GetFileName(productModel.Image.FileName);
                var filePath = Path.Combine("images", fileName); // Store relative path

                
                var fullPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", filePath);
                Directory.CreateDirectory(Path.GetDirectoryName(fullPath));

                using (var fileStream = new FileStream(fullPath, FileMode.Create))
                {
                    await productModel.Image.CopyToAsync(fileStream);
                }

                
                product.ImagePath = filePath;
            }

            try
            {
                _db.Products.Update(product);
                await _db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_db.Products.Any(p => p.Id == id))
                    return NotFound("Product not found");
                else
                    throw;
            }

            return NoContent();
        }

        // DELETE: api/Product/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]  // Only Admin role can delete products
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _db.Products.FindAsync(id);
            if (product == null)
                return NotFound("Product not found");

            _db.Products.Remove(product);
            await _db.SaveChangesAsync();

            return NoContent();
        }
    }
}

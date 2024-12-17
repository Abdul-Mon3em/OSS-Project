using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartLabel.labelData;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SmartLabel.Controllers
{
    [Authorize] // Ensure the user is authenticated
    [Route("api/[controller]")]
    [ApiController]
    public class FavoritesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FavoritesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Favorites
        [HttpGet]
        public async Task<IActionResult> GetFavorites()
        {
            // Get the userId from the JWT token
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
                return Unauthorized("User is not logged in.");

            // Fetch the user's favorite products
            var favorites = await _context.Favorites
                .Where(f => f.UserId == userId)
                .ToListAsync();

            return Ok(favorites);
        }

        // POST: api/Favorites
        [HttpPost]
        public async Task<IActionResult> AddFavorite([FromRoute] int productId)
        {
            // Get the userId from the JWT token
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
                return Unauthorized("User is not logged in.");

            // Check if the product is already in the user's favorites
            var existingFavorite = await _context.Favorites
                .FirstOrDefaultAsync(f => f.UserId == userId && f.ProductId == productId);

            if (existingFavorite != null)
                return BadRequest("Product is already in favorites.");

            // Add the new favorite
            var favorite = new Favorite
            {
                UserId = userId,
                ProductId = productId
            };

            _context.Favorites.Add(favorite);
            await _context.SaveChangesAsync();

            return Ok("Product added to favorites.");
        }

        // DELETE: api/Favorites/{productId}
        [HttpDelete("{productId}")]
        public async Task<IActionResult> RemoveFavorite(int productId)
        {
          
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
                return Unauthorized("User is not logged in.");

           
            var favorite = await _context.Favorites
                .FirstOrDefaultAsync(f => f.UserId == userId && f.ProductId == productId);

            if (favorite == null)
                return NotFound("Product is not in favorites.");

            _context.Favorites.Remove(favorite);
            await _context.SaveChangesAsync();

            return Ok("Product removed from favorites.");
        }
    }
}

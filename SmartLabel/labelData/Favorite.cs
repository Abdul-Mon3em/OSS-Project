namespace SmartLabel.labelData
{
    public class Favorite
    {

        public int Id { get; set; }
        public string UserId { get; set; }
        public int ProductId { get; set; } 
        public DateTime AddedDate { get; set; } = DateTime.UtcNow;
    }
}

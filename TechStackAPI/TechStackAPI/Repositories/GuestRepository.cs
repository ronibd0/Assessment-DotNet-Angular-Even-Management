
using TechStackAPI.Data;
using TechStackAPI.Models;

namespace TechStackAPI.Repositories
{
    public class GuestRepository
    {
        private readonly DataContext _context;
        public GuestRepository(DataContext context)
        {
            _context = context;
        }

        public IEnumerable<Guest> GetAllGuests()
        {
               return    _context.Guests.ToList();
           
        }

        public Guest GetGuestById(int id)
        {
            return _context.Guests.FirstOrDefault(g => g.GuestID == id);
        }

        public void AddGuest(Guest guest)
        {
            _context.Guests.Add(guest);
            _context.SaveChanges();
        }

        public void UpdateGuest(Guest guest)
        {
            var data = _context.Guests.FirstOrDefault(g => g.GuestID == guest.GuestID);
            //data.FirstName = guest.FirstName;
            //data.LastName = guest.LastName;
            //data.Email  =guest.Email;
            //data.DOB = guest.DOB;
            _context.Entry(data).CurrentValues.SetValues(guest);
           
            _context.SaveChanges();
            
        }

        public void DeleteGuest(int id)
        {
            var guest = _context.Guests.FirstOrDefault(g => g.GuestID == id);
            if (guest != null)
            {
                _context.Guests.Remove(guest);
                _context.SaveChanges();
            }
        }
    }
}



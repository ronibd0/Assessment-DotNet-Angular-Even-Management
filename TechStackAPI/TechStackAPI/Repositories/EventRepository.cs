
using System.Data;
using TechStackAPI.Data;
using TechStackAPI.Models;

namespace TechStackAPI.Repositories
{
    public class EventRepository
    {
       
            private readonly DataContext _context;

            public EventRepository(DataContext context)
            {
                _context = context;
            }

            public IEnumerable<Event> GetAllEvents()
            {
                return _context.Events.ToList();
            }

            public Event GetEventById(int id)
            {
                return _context.Events.FirstOrDefault(e => e.EventID == id);
            }

            public void AddEvent(Event ev)
            {
                _context.Events.Add(ev);
                _context.SaveChanges();
            }

            public void UpdateEvent(Event ev)
            {
               
            var data = _context.Events.FirstOrDefault(g => g.EventID == ev.EventID);
            
            _context.Entry(data).CurrentValues.SetValues(ev);

            _context.SaveChanges();

        }

        public void DeleteEvent(int id)
            {
                var ev = _context.Events.FirstOrDefault(e => e.EventID == id);
                if (ev != null)
                {
                    _context.Events.Remove(ev);
                    _context.SaveChanges();
                }
            }
        }

   
}

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TechStackAPI.Models;
using TechStackAPI.Repositories;

namespace TechStackAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly EventRepository _eventRepository;

        public EventController(EventRepository eventRepository)
        {
            _eventRepository = eventRepository;
        }

        [HttpGet]
        public IEnumerable<Event> GetAllEvents()
        {
            return _eventRepository.GetAllEvents();
        }

        [HttpGet("{id}")]
        public ActionResult<Event> GetEventById(int id)
        {
            var ev = _eventRepository.GetEventById(id);
            if (ev == null)
            {
                return NotFound();
            }
            return ev;
        }

        [HttpPost]
        public ActionResult<Event> AddEvent(Event ev)
        {
            _eventRepository.AddEvent(ev);
            return CreatedAtAction(nameof(GetEventById), new { id = ev.EventID }, ev);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateEvent(int id, Event ev)
        {
            var existingEvent = _eventRepository.GetEventById(id);
            if (existingEvent == null)
            {
                return NotFound();
            }

            ev.EventID = id;
            _eventRepository.UpdateEvent(ev);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteEvent(int id)
        {
            var existingEvent = _eventRepository.GetEventById(id);
            if (existingEvent == null)
            {
                return NotFound();
            }

            _eventRepository.DeleteEvent(id);
            return NoContent();
        }

    }
}

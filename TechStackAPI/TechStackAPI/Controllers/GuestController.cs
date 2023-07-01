using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TechStackAPI.Models;
using TechStackAPI.Repositories;

namespace TechStackAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GuestController : ControllerBase
    {
        private readonly GuestRepository _guestRepository;

        public GuestController(GuestRepository guestRepository)
        {
            _guestRepository = guestRepository;
        }

        [HttpGet]
        public IEnumerable<Guest> GetAllGuests()
        {
            return _guestRepository.GetAllGuests();
        }

        [HttpGet("{id}")]
        public ActionResult<Guest> GetGuestById(int id)
        {
            var guest = _guestRepository.GetGuestById(id);
            if (guest.GuestID < 0)
            {
                return NotFound();
            }
            return guest;
        }

        [HttpPost]
        public ActionResult<Guest> AddGuest(Guest guest)
        {
            _guestRepository.AddGuest(guest);
            return CreatedAtAction(nameof(GetGuestById), new { id = guest.GuestID }, guest);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateGuest(int id, Guest guest)
        {
            var existingGuest = _guestRepository.GetGuestById(id);
            if (existingGuest == null)
            {
                return NotFound();
            }

            guest.GuestID = id;
            _guestRepository.UpdateGuest(guest);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteGuest(int id)
        {
            var existingGuest = _guestRepository.GetGuestById(id);
            if (existingGuest == null)
            {
                return NotFound();
            }

            _guestRepository.DeleteGuest(id);
            return Ok();
        }

    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TechStackAPI.Models
{
    public class Event
    {
        public int EventID { get; set; }

        [Required(ErrorMessage = "Event Name is required")]
        public string EventName { get; set; }

        [Required(ErrorMessage = "Event Date is required")]
        public DateTime EventDate { get; set; }

        [Required(ErrorMessage = "At least 2 guests are required")]
        
        public string ListOfGuest { get; set; }
    }
}

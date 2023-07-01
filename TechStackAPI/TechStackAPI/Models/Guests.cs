using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TechStackAPI.Models
{
    public class Guest
    {
        public int GuestID { get; set; }

        [Required(ErrorMessage = "First Name is required")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Last Name is required")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid Email")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Date of Birth is required")]
        public DateTime DOB { get; set; }

        public string Allergies { get; set; }
    }
}

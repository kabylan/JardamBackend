using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Jardam.Data;
using Jardam.Models;
using Jardam.Services;

namespace Jardam.Areas.Identity.Pages.Account
{
    [AllowAnonymous]
    public class ResetPasswordConfirmationModel : PageModel
    {
        private readonly ApplicationDbContext _context;

        public ResetPasswordConfirmationModel(ApplicationDbContext context)
        {
            _context = context;
        }

        public void OnGet()
        {
        }
    }
}

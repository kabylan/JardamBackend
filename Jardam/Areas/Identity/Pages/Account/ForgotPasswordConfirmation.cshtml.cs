using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Jardam.Data;
using System.Linq;

namespace Jardam.Areas.Identity.Pages.Account
{
    [AllowAnonymous]
    public class ForgotPasswordConfirmation : PageModel
    {
        private readonly ApplicationDbContext _context;

        public ForgotPasswordConfirmation(ApplicationDbContext context)
        {
            _context = context;
        }

        public void OnGet()
        {
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Jardam.Data;
using Jardam.Models;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;


namespace Jardam.Controllers
{
    public class HelpDatasController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public HelpDatasController(ApplicationDbContext context,
            UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public class HelpDataViewModel 
        {

            public DateTime CreateDateTime { get; set; }

            public string Lat { get; set; }

            public string Long { get; set; }

            public string UserFirstName { get; set; }

            public string UserLastName { get; set; }

            public string UserID { get; set; }
        }

        // GET: HelpDatas
        public async Task<IActionResult> Index()
        {
            var helpDatas = await _context.HelpData.ToListAsync();

            List<HelpDataViewModel> helpDataViewModels = new List<HelpDataViewModel>();

            var users = await _context.Users.ToListAsync();

            helpDatas.ForEach(m => {

                var helpDataViewModel = new HelpDataViewModel
                {
                    UserFirstName = "",
                    UserLastName = "",
                    Lat = m.Lat,
                    Long = m.Long,
                    CreateDateTime = m.CreateDateTime
                };

                var user = new ApplicationUser();
                if (!String.IsNullOrEmpty(m.UserID))
                {
                    user = users.Where(v => v.Id == m.UserID).FirstOrDefault();
                }

                if (user != null)
                {
                    helpDataViewModel.UserFirstName = user.firstName;
                    helpDataViewModel.UserLastName = user.lastName;
                    helpDataViewModel.UserID = user.Id;
                }
                
                helpDataViewModels.Add(helpDataViewModel);
            });

            return Json(helpDataViewModels.OrderBy(m => m.CreateDateTime));
        }

        // GET: HelpDatas/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var helpData = await _context.HelpData
                .FirstOrDefaultAsync(m => m.Id == id);
            if (helpData == null)
            {
                return NotFound();
            }

            return View(helpData);
        }

        // GET: HelpDatas/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: HelpDatas/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        public async Task<string> Create(string Lat, string Long)
        {
            var helpData = new HelpData();

            if (!String.IsNullOrEmpty(Lat) && !String.IsNullOrEmpty(Long))
            {
                helpData.Lat = Lat;
                helpData.Long = Long;

                ApplicationUser user = new ApplicationUser() { Id = "" };
                
                user = await _userManager.GetUserAsync(User);
                if (user == null)
                {
                    helpData.UserID = "";
                } else
                {
                    helpData.UserID = user.Id;
                }

                helpData.CreateDateTime = DateTime.Now;
                //helpData.CreateDateTime = DateTime.Parse("2022-06-02 22:00");

                _context.Add(helpData);
                await _context.SaveChangesAsync();
                return "{status: 'OK'}";
            }
            return "{status: 'FAILED'}";
        }

        // GET: HelpDatas/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var helpData = await _context.HelpData.FindAsync(id);
            if (helpData == null)
            {
                return NotFound();
            }
            return View(helpData);
        }

        // POST: HelpDatas/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,CreateDateTime,Lat,Long,UserID")] HelpData helpData)
        {
            if (id != helpData.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(helpData);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!HelpDataExists(helpData.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(helpData);
        }

        // GET: HelpDatas/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var helpData = await _context.HelpData
                .FirstOrDefaultAsync(m => m.Id == id);
            if (helpData == null)
            {
                return NotFound();
            }

            return View(helpData);
        }

        // POST: HelpDatas/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var helpData = await _context.HelpData.FindAsync(id);
            _context.HelpData.Remove(helpData);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool HelpDataExists(int id)
        {
            return _context.HelpData.Any(e => e.Id == id);
        }
    }
}

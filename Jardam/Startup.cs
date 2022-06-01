using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.EntityFrameworkCore;
using Jardam.Data;
using Jardam.Models;
using Jardam.Services;
using XLocalizer;
using XLocalizer.ErrorMessages;
using Microsoft.AspNetCore.Identity.UI.Services;

namespace Jardam
{
    public class LocSource
    {
    }
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
       options.UseSqlServer(
           Configuration.GetConnectionString("DefaultConnection")));

            services.AddDatabaseDeveloperPageExceptionFilter();

            services.AddIdentity<ApplicationUser, IdentityRole>(options => options.SignIn.RequireConfirmedAccount = true)
                .AddDefaultUI()
                .AddRoles<IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            services.AddControllersWithViews();
            services.AddTransient<IEmailService, EmailService>();
            services.AddCors(); // Make sure you call this previous to AddMvc

            services.AddRazorPages()
                .AddXLocalizer<LocSource>(ops =>
                {
                    // ...
                    ops.ValidationErrors = new ValidationErrors
                    {
                        RequiredAttribute_ValidationError = "���� {0} ����������� ��� ����������.",
                        CompareAttribute_MustMatch = "'{0}' � '{1}' �� ���������.",
                        StringLengthAttribute_ValidationError = "The field {0} must be a string with a maximum length of {1}.",
                        // ...
                    };
                    ops.ModelBindingErrors = new ModelBindingErrors
                    {
                        AttemptedValueIsInvalidAccessor = "The value '{0}' is not valid for {1}.",
                        MissingBindRequiredValueAccessor = "A value for the '{0}' parameter or property was not provided.",
                        MissingKeyOrValueAccessor = "���� ����������� ��� ����������.",
                        // ...
                    };
                    ops.IdentityErrors = new IdentityErrors
                    {
                        DuplicateEmail = "Email '{0}' ��� ������������.",
                        DuplicateUserName = "��� ������������ '{0}' ��� ������������.",
                        InvalidEmail = "Email '{0}' �� �������.",
                        PasswordRequiresDigit = "������ ������ ��������� �� ������� ���� ���� ����� ('0' - '9').",
                        PasswordRequiresUpper = "������ ������ ��������� �� ������� ���� ���� ��������� ����� ('A'-'Z').",
                        PasswordRequiresNonAlphanumeric = "������ ������ ��������� ���� �� ���� �� ��������-�������� ������.",
                        PasswordRequiresLower = "� ������ ������ ���� ���� �� ���� �������� ����� ('a' - 'z').",
                        // ...
                    };
                });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseMigrationsEndPoint();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseStatusCodePagesWithRedirects("/Error/Http?statusCode={0}");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseCors(builder => builder
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());
            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "areas",
                    pattern: "{area:exists}/{controller=Home}/{action=Index}/{id?}"
                );

                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");

                endpoints.MapRazorPages();
            });
        }
    }
}

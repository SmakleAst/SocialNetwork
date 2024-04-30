using Microsoft.AspNetCore.Mvc;
using SocialNetwork.Domain.ViewModels;
using SocialNetwork.Service.Interfaces;

namespace SocialNetwork.Controllers
{
    public class AuthController : Controller
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService) =>
            _authService = authService;
        
        public IActionResult Index()
        {
            return View();
        }

        [Route("/Auth/Authentification")]
        [HttpGet]
        public async Task<IActionResult> Authentification(AuthViewModel model)
        {
            var response = await _authService.AuthentificateUser(model);

            if (response.StatusCode == Domain.Enum.StatusCode.Ok)
            {
                return Ok(new { description = response.Description });
            }

            return BadRequest(new { description = response.Description });
        }

        [Route("/Auth/Registration")]
        [HttpPost]
        public async Task<IActionResult> Registration(RegistrationViewModel model)
        {
            var response = await _authService.RegistrateUser(model);

            if (response.StatusCode == Domain.Enum.StatusCode.Ok)
            {
                return Ok(new { description = response.Description });
            }

            return BadRequest(new { description = response.Description });
        }
    }
}

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication.MicrosoftAccount;
using Microsoft.Extensions.Configuration;

[Route("api/auth")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly JwtService _jwtService;

    public AuthController(JwtService jwtService)
    {
        _jwtService = jwtService;
    }

    [HttpGet("google-login")]
    public IActionResult GoogleLogin()
    {
        var redirectUrl = Url.Action(nameof(GoogleCallback), "Auth");
        var properties = new AuthenticationProperties { RedirectUri = redirectUrl };
        return Challenge(properties, GoogleDefaults.AuthenticationScheme);
    }

    [HttpGet("google-callback")]
    public async Task<IActionResult> GoogleCallback()
    {
        var authenticateResult = await HttpContext.AuthenticateAsync(GoogleDefaults.AuthenticationScheme);

        if (!authenticateResult.Succeeded)
            return Unauthorized(new { message = "Invalid Google Token" });

        var email = authenticateResult.Principal.FindFirstValue(ClaimTypes.Email);
        var userId = authenticateResult.Principal.FindFirstValue(ClaimTypes.NameIdentifier);

        var token = _jwtService.GenerateToken(userId, email);

        return Redirect($"http://localhost:3000?token={token}");
    }



    [HttpGet("microsoft-login")]
    public IActionResult MicrosoftLogin()
    {
        var redirectUrl = Url.Action(nameof(MicrosoftCallback), "Auth");
        var properties = new AuthenticationProperties { RedirectUri = redirectUrl };
        return Challenge(properties, "Microsoft");
    }

    [HttpGet("microsoft-callback")]
    public async Task<IActionResult> MicrosoftCallback()
    {
        var authenticateResult = await HttpContext.AuthenticateAsync("Microsoft");

        if (!authenticateResult.Succeeded)
            return Unauthorized(new { message = "Microsoft login failed" });

        var email = authenticateResult.Principal.FindFirstValue(ClaimTypes.Email);
        var userId = authenticateResult.Principal.FindFirstValue(ClaimTypes.NameIdentifier);

        var token = _jwtService.GenerateToken(userId, email);
        return Redirect($"http://localhost:3000?token={token}");
    }
}

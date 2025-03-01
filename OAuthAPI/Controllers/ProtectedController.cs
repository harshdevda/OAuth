using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Route("api/protected")]
[ApiController]
public class ProtectedController : ControllerBase
{
    [Authorize]
    [HttpGet]
    public IActionResult GetSecureData()
    {
        return Ok(new { Message = "This is a protected API route." });
    }
}

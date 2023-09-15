using MaintainSys.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class TechnicianInfoController : ControllerBase
{
    private readonly AppDbContext _context;

    public TechnicianInfoController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TechnicianInfo>>> GetTechnicianInfos()
    {
        return await _context.TechnicianInfo.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TechnicianInfo>> GetTechnicianInfo(int id)
    {
        var technicianInfo = await _context.TechnicianInfo.FindAsync(id);

        if (technicianInfo == null)
        {
            return NotFound();
        }

        return technicianInfo;
    }

    [HttpPost]
    public async Task<ActionResult<TechnicianInfo>> PostTechnicianInfo(TechnicianInfo technicianInfo)
    {
        _context.TechnicianInfo.Add(technicianInfo);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetTechnicianInfo), new { id = technicianInfo.TechnicianId }, technicianInfo);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutTechnicianInfo(int id, TechnicianInfo technicianInfo)
    {
        if (id != technicianInfo.TechnicianId)
        {
            return BadRequest();
        }

        _context.Entry(technicianInfo).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!TechnicianInfoExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTechnicianInfo(int id)
    {
        var technicianInfo = await _context.TechnicianInfo.FindAsync(id);
        if (technicianInfo == null)
        {
            return NotFound();
        }

        _context.TechnicianInfo.Remove(technicianInfo);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool TechnicianInfoExists(int id)
    {
        return _context.TechnicianInfo.Any(e => e.TechnicianId == id);
    }
}

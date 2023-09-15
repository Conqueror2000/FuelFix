using MaintainSys.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class TicketInfoController : ControllerBase
{
    private readonly AppDbContext _context;

    public TicketInfoController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TicketInfo>>> GetTicketInfos()
    {
        return await _context.TicketInfo.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TicketInfo>> GetTicketInfo(int id)
    {
        var ticketInfo = await _context.TicketInfo.FindAsync(id);

        if (ticketInfo == null)
        {
            return NotFound();
        }

        return ticketInfo;
    }


    [HttpGet("byemployee/{employeeId}")]
    public async Task<ActionResult<IEnumerable<TicketInfo>>> GetByEmployeeId(int employeeId)
    {
        var tickets = await _context.TicketInfo
            .Where(t => t.EmployeeId == employeeId)
            .ToListAsync();

        return Ok(tickets);
    }

    [HttpGet("bytechnician/{technicianId}")]
    public async Task<ActionResult<IEnumerable<TicketInfo>>> GetByTechnicianId(int technicianId)
    {
        var tickets = await _context.TicketInfo
            .Where(t => t.TechnicianId == technicianId)
            .ToListAsync();

        return Ok(tickets);
    }

    [HttpPost]
    public async Task<ActionResult<TicketInfo>> PostTicketInfo(TicketInfo ticketInfo)
    {
        _context.TicketInfo.Add(ticketInfo);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetTicketInfo), new { id = ticketInfo.TicketNumber }, ticketInfo);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutTicketInfo(int id, TicketInfo ticketInfo)
    {
        if (id != ticketInfo.TicketNumber)
        {
            return BadRequest();
        }

        _context.Entry(ticketInfo).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!TicketInfoExists(id))
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
    public async Task<IActionResult> DeleteTicketInfo(int id)
    {
        var ticketInfo = await _context.TicketInfo.FindAsync(id);
        if (ticketInfo == null)
        {
            return NotFound();
        }

        _context.TicketInfo.Remove(ticketInfo);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool TicketInfoExists(int id)
    {
        return _context.TicketInfo.Any(e => e.TicketNumber == id);
    }
}

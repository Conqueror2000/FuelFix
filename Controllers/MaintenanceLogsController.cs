using MaintainSys.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class MaintenanceLogsController : ControllerBase
{
    private readonly AppDbContext _context;

    public MaintenanceLogsController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/MaintenanceLogs
    [HttpGet]
    public async Task<ActionResult<IEnumerable<MaintenanceLog>>> GetMaintenanceLogs()
    {
        return await _context.MaintenanceLog.ToListAsync();
    }

    // GET: api/MaintenanceLogs/5
    [HttpGet("{id}")]
    public async Task<ActionResult<MaintenanceLog>> GetMaintenanceLog(int id)
    {
        var maintenanceLog = await _context.MaintenanceLog.FindAsync(id);

        if (maintenanceLog == null)
        {
            return NotFound();
        }

        return maintenanceLog;
    }

    // POST: api/MaintenanceLogs
    [HttpPost]
    public async Task<ActionResult<MaintenanceLog>> PostMaintenanceLog(MaintenanceLog maintenanceLog)
    {
        _context.MaintenanceLog.Add(maintenanceLog);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetMaintenanceLog", new { id = maintenanceLog.Log_id }, maintenanceLog);
    }

    // PUT: api/MaintenanceLogs/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutMaintenanceLog(int id, MaintenanceLog maintenanceLog)
    {
        if (id != maintenanceLog.Log_id)
        {
            return BadRequest();
        }

        _context.Entry(maintenanceLog).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!MaintenanceLogExists(id))
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

    // DELETE: api/MaintenanceLogs/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMaintenanceLog(int id)
    {
        var maintenanceLog = await _context.MaintenanceLog.FindAsync(id);
        if (maintenanceLog == null)
        {
            return NotFound();
        }

        _context.MaintenanceLog.Remove(maintenanceLog);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool MaintenanceLogExists(int id)
    {
        return _context.MaintenanceLog.Any(e => e.Log_id == id);
    }
}
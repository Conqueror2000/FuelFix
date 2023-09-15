using MaintainSys.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class EmployeeInfoController : ControllerBase
{
    private readonly AppDbContext _context;

    public EmployeeInfoController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<EmployeeInfo>>> GetEmployeeInfos()
    {
        return await _context.EmployeeInfo.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<EmployeeInfo>> GetEmployeeInfo(int id)
    {
        var employeeInfo = await _context.EmployeeInfo.FindAsync(id);

        if (employeeInfo == null)
        {
            return NotFound();
        }

        return employeeInfo;
    }



    [HttpPost]
    public async Task<ActionResult<EmployeeInfo>> PostEmployeeInfo(EmployeeInfo employeeInfo)
    {
        _context.EmployeeInfo.Add(employeeInfo);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetEmployeeInfo), new { id = employeeInfo.EmployeeId }, employeeInfo);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutEmployeeInfo(int id, EmployeeInfo employeeInfo)
    {
        if (id != employeeInfo.EmployeeId)
        {
            return BadRequest();
        }

        _context.Entry(employeeInfo).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!EmployeeInfoExists(id))
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
    public async Task<IActionResult> DeleteEmployeeInfo(int id)
    {
        var employeeInfo = await _context.EmployeeInfo.FindAsync(id);
        if (employeeInfo == null)
        {
            return NotFound();
        }

        _context.EmployeeInfo.Remove(employeeInfo);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool EmployeeInfoExists(int id)
    {
        return _context.EmployeeInfo.Any(e => e.EmployeeId == id);
    }
}

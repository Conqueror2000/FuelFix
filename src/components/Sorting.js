// Sorting function that takes tickets and sorting order as input
const sortTickets = (tickets, sortOrder) => {
    // Create a copy of the tickets array to avoid mutating the original state
    const sortedTickets = [...tickets];
  
    sortedTickets.sort((a, b) => {
      // Define the priority order (from highest to lowest)
      const priorityOrder = ['Critical', 'High', 'Medium', 'Low'];
  
      // Get the index of the priority for both tickets
      const priorityA = priorityOrder.indexOf(a.Priority);
      const priorityB = priorityOrder.indexOf(b.Priority);
  
      if (sortOrder === 'asc') {
        return priorityA - priorityB; // Ascending order
      } else {
        return priorityB - priorityA; // Descending order
      }
    });
  
    return sortedTickets;
  };
  
  export default sortTickets;
  
export interface Event {
  id: number;
  name: string;
  date: string;
}

export async function getOngoingEvents(): Promise<Event[]> {
  try {
    const response = await fetch('http://localhost:5001/api/event', {
      next: {
        revalidate: 60
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }

    const events: Event[] = await response.json();
    return events;
  } catch (error) {
    console.error(error);
    return [];
  }
}
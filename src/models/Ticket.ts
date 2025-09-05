import supabase from "#config/db";

export interface Ticket {
  id?: string;
  ticket_number: string;
  organization: string;
  status?: string;
  expiration_date?: string;
  location?: string;
  notes?: string;
  created_by?: string;
  created_at?: string;
}

export class TicketModel {
  
  // Create a new ticket
  static async create(ticket: Ticket) {
    const { data, error } = await supabase
      .from("tickets")
      .insert(ticket)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // Find ticket by ID
  static async findById(id: string) {
    const { data, error } = await supabase
      .from("tickets")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return null;
    return data;
  }

  // Find all tickets
  static async findAll() {
    const { data, error } = await supabase
      .from("tickets")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return data;
  }

  // Find tickets by user
  static async findByUser(userId: string) {
    const { data, error } = await supabase
      .from("tickets")
      .select("*")
      .eq("created_by", userId)
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return data;
  }

  // Update ticket by ID
  static async update(id: string, updates: Partial<Ticket>) {
    const { data, error } = await supabase
      .from("tickets")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // Delete ticket (optional)
  static async delete(id: string) {
    const { data, error } = await supabase
      .from("tickets")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  static async bulkCreate(tickets: Ticket[]) {
    const { data, error } = await supabase
      .from("tickets")
      .insert(tickets)
      .select();

    if (error) throw new Error(error.message);
    return data;
  }
}

import supabase from "#config/db";

export interface Renewal {
  id: string;
  ticket_id: string;
  renewed_at?: string;
  renewed_by?: string;
  old_expiration?: string;
  new_expiration?: string;
  notes?: string;
}

export const RenewalModel = {
  async logRenewal(renewal: Omit<Renewal, "id" | "renewed_at">) {
    const { data, error } = await supabase
      .from("renewals")
      .insert(renewal)
      .select()
      .single();

    if (error) throw error;
    return data as Renewal;
  },

  async findByTicket(ticket_id: string) {
    const { data, error } = await supabase
      .from("renewals")
      .select("*")
      .eq("ticket_id", ticket_id)
      .order("renewed_at", { ascending: false });

    if (error) throw error;
    return data as Renewal[];
  }
};

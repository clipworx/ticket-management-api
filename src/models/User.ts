import supabase from "#config/db";

export interface User {
  id: string;
  email: string;
  password: string;
  full_name?: string;
  role: "admin" | "contractor" ;
  created_at?: string;
}

export const UserModel = {
  async create(user: Omit<User, "id" | "created_at">) {
    const { data, error } = await supabase
      .from("users")
      .insert(user)
      .select()
      .single();

    if (error) {
      throw error;
    }
    return data as User;
  },

  async findByEmail(email: string) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error) return null;
    return data as User;
  },

  async findById(id: string) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return null;
    return data as User;
  }
};

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      donation_matches: {
        Row: {
          created_at: string
          donation_date: string | null
          donor_id: string
          id: string
          match_date: string
          patient_id: string
          status: Database["public"]["Enums"]["match_status"]
        }
        Insert: {
          created_at?: string
          donation_date?: string | null
          donor_id: string
          id?: string
          match_date?: string
          patient_id: string
          status?: Database["public"]["Enums"]["match_status"]
        }
        Update: {
          created_at?: string
          donation_date?: string | null
          donor_id?: string
          id?: string
          match_date?: string
          patient_id?: string
          status?: Database["public"]["Enums"]["match_status"]
        }
        Relationships: [
          {
            foreignKeyName: "donation_matches_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "donors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donation_matches_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      donors: {
        Row: {
          blood_type: Database["public"]["Enums"]["blood_type"]
          id: string
          is_available: boolean
          last_donation: string | null
        }
        Insert: {
          blood_type: Database["public"]["Enums"]["blood_type"]
          id: string
          is_available?: boolean
          last_donation?: string | null
        }
        Update: {
          blood_type?: Database["public"]["Enums"]["blood_type"]
          id?: string
          is_available?: boolean
          last_donation?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "donors_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      hospital_registrations: {
        Row: {
          address: string
          blood_bank_registration_number: string | null
          city: string
          collaboration_details: string
          contact_person_email: string
          contact_person_name: string
          contact_person_phone: string
          created_at: string
          id: string
          name: string
          pincode: string
          registration_number: string | null
          specific_requirements: string | null
          state: string
          status: string
        }
        Insert: {
          address: string
          blood_bank_registration_number?: string | null
          city: string
          collaboration_details: string
          contact_person_email: string
          contact_person_name: string
          contact_person_phone: string
          created_at?: string
          id?: string
          name: string
          pincode: string
          registration_number?: string | null
          specific_requirements?: string | null
          state: string
          status?: string
        }
        Update: {
          address?: string
          blood_bank_registration_number?: string | null
          city?: string
          collaboration_details?: string
          contact_person_email?: string
          contact_person_name?: string
          contact_person_phone?: string
          created_at?: string
          id?: string
          name?: string
          pincode?: string
          registration_number?: string | null
          specific_requirements?: string | null
          state?: string
          status?: string
        }
        Relationships: []
      }
      ngo_registrations: {
        Row: {
          activities_description: string
          address: string
          certificate_12a: string | null
          certificate_80g: string | null
          city: string
          collaboration_plan: string
          contact_person_email: string
          contact_person_name: string
          contact_person_phone: string
          created_at: string
          id: string
          name: string
          pan_number: string
          pincode: string
          registration_number: string
          registration_type: Database["public"]["Enums"]["ngo_registration_type"]
          state: string
          status: string
        }
        Insert: {
          activities_description: string
          address: string
          certificate_12a?: string | null
          certificate_80g?: string | null
          city: string
          collaboration_plan: string
          contact_person_email: string
          contact_person_name: string
          contact_person_phone: string
          created_at?: string
          id?: string
          name: string
          pan_number: string
          pincode: string
          registration_number: string
          registration_type: Database["public"]["Enums"]["ngo_registration_type"]
          state: string
          status?: string
        }
        Update: {
          activities_description?: string
          address?: string
          certificate_12a?: string | null
          certificate_80g?: string | null
          city?: string
          collaboration_plan?: string
          contact_person_email?: string
          contact_person_name?: string
          contact_person_phone?: string
          created_at?: string
          id?: string
          name?: string
          pan_number?: string
          pincode?: string
          registration_number?: string
          registration_type?: Database["public"]["Enums"]["ngo_registration_type"]
          state?: string
          status?: string
        }
        Relationships: []
      }
      patients: {
        Row: {
          blood_type: Database["public"]["Enums"]["blood_type"]
          id: string
          organization_id: string | null
          organization_name: string | null
          request_status: Database["public"]["Enums"]["request_status"]
          requested_date: string | null
          requestor_role: string | null
          urgency: Database["public"]["Enums"]["urgency_level"]
        }
        Insert: {
          blood_type: Database["public"]["Enums"]["blood_type"]
          id: string
          organization_id?: string | null
          organization_name?: string | null
          request_status?: Database["public"]["Enums"]["request_status"]
          requested_date?: string | null
          requestor_role?: string | null
          urgency?: Database["public"]["Enums"]["urgency_level"]
        }
        Update: {
          blood_type?: Database["public"]["Enums"]["blood_type"]
          id?: string
          organization_id?: string | null
          organization_name?: string | null
          request_status?: Database["public"]["Enums"]["request_status"]
          requested_date?: string | null
          requestor_role?: string | null
          urgency?: Database["public"]["Enums"]["urgency_level"]
        }
        Relationships: [
          {
            foreignKeyName: "patients_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          city: string
          created_at: string
          email: string
          id: string
          name: string
          phone: string
          role: Database["public"]["Enums"]["user_role"]
        }
        Insert: {
          city: string
          created_at?: string
          email: string
          id?: string
          name: string
          phone: string
          role: Database["public"]["Enums"]["user_role"]
        }
        Update: {
          city?: string
          created_at?: string
          email?: string
          id?: string
          name?: string
          phone?: string
          role?: Database["public"]["Enums"]["user_role"]
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      blood_type: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-"
      match_status: "pending" | "contacted" | "completed" | "canceled"
      ngo_registration_type: "trust" | "society" | "section_8_company"
      request_status: "pending" | "matched" | "fulfilled"
      urgency_level: "low" | "medium" | "high"
      user_role: "donor" | "patient" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      blood_type: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      match_status: ["pending", "contacted", "completed", "canceled"],
      ngo_registration_type: ["trust", "society", "section_8_company"],
      request_status: ["pending", "matched", "fulfilled"],
      urgency_level: ["low", "medium", "high"],
      user_role: ["donor", "patient", "admin"],
    },
  },
} as const

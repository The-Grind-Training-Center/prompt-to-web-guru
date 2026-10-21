export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      announcements: {
        Row: {
          content: string
          created_at: string
          display_order: number | null
          id: string
          is_active: boolean | null
          title: string
        }
        Insert: {
          content: string
          created_at?: string
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          title: string
        }
        Update: {
          content?: string
          created_at?: string
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          title?: string
        }
        Relationships: []
      }
      app_settings: {
        Row: {
          key: string
          value: string
        }
        Insert: {
          key: string
          value: string
        }
        Update: {
          key?: string
          value?: string
        }
        Relationships: []
      }
      backstop_leads: {
        Row: {
          athlete_age: number
          created_at: string
          email: string
          fbclid: string | null
          gbraid: string | null
          gclid: string | null
          id: string
          landing_page: string | null
          notified_at: string | null
          parent_name: string
          phone: string
          referrer: string | null
          status: string
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          wbraid: string | null
        }
        Insert: {
          athlete_age: number
          created_at?: string
          email: string
          fbclid?: string | null
          gbraid?: string | null
          gclid?: string | null
          id?: string
          landing_page?: string | null
          notified_at?: string | null
          parent_name: string
          phone: string
          referrer?: string | null
          status?: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          wbraid?: string | null
        }
        Update: {
          athlete_age?: number
          created_at?: string
          email?: string
          fbclid?: string | null
          gbraid?: string | null
          gclid?: string | null
          id?: string
          landing_page?: string | null
          notified_at?: string | null
          parent_name?: string
          phone?: string
          referrer?: string | null
          status?: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          wbraid?: string | null
        }
        Relationships: []
      }
      camps_clinics: {
        Row: {
          age_range: string | null
          created_at: string
          description: string | null
          end_date: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          price: number | null
          registration_url: string
          start_date: string
          title: string
          updated_at: string
        }
        Insert: {
          age_range?: string | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          price?: number | null
          registration_url: string
          start_date: string
          title: string
          updated_at?: string
        }
        Update: {
          age_range?: string | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          price?: number | null
          registration_url?: string
          start_date?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string
          description: string | null
          end_time: string | null
          event_date: string
          event_type: string | null
          id: string
          image_url: string | null
          is_featured: boolean | null
          location: string | null
          registration_url: string | null
          start_time: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          end_time?: string | null
          event_date: string
          event_type?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          location?: string | null
          registration_url?: string | null
          start_time?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          end_time?: string | null
          event_date?: string
          event_type?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          location?: string | null
          registration_url?: string | null
          start_time?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      gallery_images: {
        Row: {
          caption: string | null
          category: string | null
          created_at: string
          display_order: number | null
          id: string
          image_url: string
        }
        Insert: {
          caption?: string | null
          category?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          image_url: string
        }
        Update: {
          caption?: string | null
          category?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          image_url?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          athlete_age: number | null
          created_at: string
          details: Json | null
          email: string | null
          event_id: string | null
          fbclid: string | null
          first_touch: Json | null
          gbraid: string | null
          gclid: string | null
          id: string
          landing_page: string | null
          notified_at: string | null
          offer: string
          parent_name: string | null
          phone: string | null
          referrer: string | null
          status: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          wbraid: string | null
        }
        Insert: {
          athlete_age?: number | null
          created_at?: string
          details?: Json | null
          email?: string | null
          event_id?: string | null
          fbclid?: string | null
          first_touch?: Json | null
          gbraid?: string | null
          gclid?: string | null
          id?: string
          landing_page?: string | null
          notified_at?: string | null
          offer: string
          parent_name?: string | null
          phone?: string | null
          referrer?: string | null
          status?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          wbraid?: string | null
        }
        Update: {
          athlete_age?: number | null
          created_at?: string
          details?: Json | null
          email?: string | null
          event_id?: string | null
          fbclid?: string | null
          first_touch?: Json | null
          gbraid?: string | null
          gclid?: string | null
          id?: string
          landing_page?: string | null
          notified_at?: string | null
          offer?: string
          parent_name?: string | null
          phone?: string | null
          referrer?: string | null
          status?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          wbraid?: string | null
        }
        Relationships: []
      }
      pastdue_accounts: {
        Row: {
          data: Json
          key: string
          sort: number
        }
        Insert: {
          data: Json
          key: string
          sort: number
        }
        Update: {
          data?: Json
          key?: string
          sort?: number
        }
        Relationships: []
      }
      pastdue_config: {
        Row: {
          id: number
          passkey_sha256: string
        }
        Insert: {
          id?: number
          passkey_sha256: string
        }
        Update: {
          id?: number
          passkey_sha256?: string
        }
        Relationships: []
      }
      pastdue_marks: {
        Row: {
          by_name: string
          key: string
          note: string
          other: boolean
          status: string
          updated_at: string
        }
        Insert: {
          by_name?: string
          key: string
          note?: string
          other?: boolean
          status?: string
          updated_at?: string
        }
        Update: {
          by_name?: string
          key?: string
          note?: string
          other?: boolean
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pastdue_marks_key_fkey"
            columns: ["key"]
            isOneToOne: true
            referencedRelation: "pastdue_accounts"
            referencedColumns: ["key"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

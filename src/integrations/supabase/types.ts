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
      saved_properties: {
        Row: {
          user_id: string;
          property_id: number;
          created_at?: string;
        };
        Insert: {
          user_id: string;
          property_id: number;
          created_at?: string;
        };
        Update: {
          user_id?: string;
          property_id?: number;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "saved_properties_property_id_fkey";
            columns: ["property_id"];
            referencedRelation: "Senior Draft 3";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "saved_properties_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      "Senior Draft 3": {
        Row: {
          "1brstart": string | null
          "2brstart": string | null
          address: string | null
          amenities: string | null
          city: string | null
          floorplan_types: string | null
          geo_hash: string | null
          headline: string | null
          id: number
          latitude: number | null
          longitude: number | null
          metroregion: string | null
          name: string | null
          seo_description: string | null
          state: string | null
          url_slug: string | null
          website_link: string | null
          zipCode: number | null
        }
        Insert: {
          "1brstart"?: string | null
          "2brstart"?: string | null
          address?: string | null
          amenities?: string | null
          city?: string | null
          floorplan_types?: string | null
          geo_hash?: string | null
          headline?: string | null
          id: number
          latitude?: number | null
          longitude?: number | null
          metroregion?: string | null
          name?: string | null
          seo_description?: string | null
          state?: string | null
          url_slug?: string | null
          website_link?: string | null
          zipCode?: number | null
        }
        Update: {
          "1brstart"?: string | null
          "2brstart"?: string | null
          address?: string | null
          amenities?: string | null
          city?: string | null
          floorplan_types?: string | null
          geo_hash?: string | null
          headline?: string | null
          id?: number
          latitude?: number | null
          longitude?: number | null
          metroregion?: string | null
          name?: string | null
          seo_description?: string | null
          state?: string | null
          url_slug?: string | null
          website_link?: string | null
          zipCode?: number | null
        }
        Relationships: []
      }
      "Senior Housing": {
        Row: {
          address: string | null
          amenities: string | null
          availability_status: string | null
          bathrooms: number | null
          bedrooms: number | null
          city: string | null
          contact_contact: string | null
          contact_name: string | null
          description: string | null
          id: number
          key_features: string | null
          name: string | null
          price_range: string | null
          square_footage: number | null
          type: string | null
          website_link: string | null
          zipCode: string | null
        }
        Insert: {
          address?: string | null
          amenities?: string | null
          availability_status?: string | null
          bathrooms?: number | null
          bedrooms?: number | null
          city?: string | null
          contact_contact?: string | null
          contact_name?: string | null
          description?: string | null
          id: number
          key_features?: string | null
          name?: string | null
          price_range?: string | null
          square_footage?: number | null
          type?: string | null
          website_link?: string | null
          zipCode?: string | null
        }
        Update: {
          address?: string | null
          amenities?: string | null
          availability_status?: string | null
          bathrooms?: number | null
          bedrooms?: number | null
          city?: string | null
          contact_contact?: string | null
          contact_name?: string | null
          description?: string | null
          id?: number
          key_features?: string | null
          name?: string | null
          price_range?: string | null
          square_footage?: number | null
          type?: string | null
          website_link?: string | null
          zipCode?: string | null
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
      [_ in never]: never
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
    Enums: {},
  },
} as const

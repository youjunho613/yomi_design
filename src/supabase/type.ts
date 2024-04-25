export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      board: {
        Row: {
          address: string;
          created_at: string;
          id: number;
          mainCategory: string;
          mainPhotoUrl: string;
          photoUrl: string[];
          subCategory: string;
          title: string;
        };
        Insert: {
          address: string;
          created_at?: string;
          id?: number;
          mainCategory: string;
          mainPhotoUrl: string;
          photoUrl: string[];
          subCategory: string;
          title: string;
        };
        Update: {
          address?: string;
          created_at?: string;
          id?: number;
          mainCategory?: string;
          mainPhotoUrl?: string;
          photoUrl?: string[];
          subCategory?: string;
          title?: string;
        };
        Relationships: [];
      };
      estimate: {
        Row: {
          address: string;
          created_at: string;
          id: number;
          inquiryContent: string;
          phone: string;
          photoUrl: string[] | null;
          status: Database["public"]["Enums"]["estimateStatus"];
          storeCategory: string;
          storeName: string;
          storePhoto: string[] | null;
        };
        Insert: {
          address: string;
          created_at?: string;
          id?: number;
          inquiryContent: string;
          phone: string;
          photoUrl?: string[] | null;
          status?: Database["public"]["Enums"]["estimateStatus"];
          storeCategory: string;
          storeName: string;
          storePhoto?: string[] | null;
        };
        Update: {
          address?: string;
          created_at?: string;
          id?: number;
          inquiryContent?: string;
          phone?: string;
          photoUrl?: string[] | null;
          status?: Database["public"]["Enums"]["estimateStatus"];
          storeCategory?: string;
          storeName?: string;
          storePhoto?: string[] | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      estimateStatus: "confirm" | "done" | "hidden" | "unconfirmed";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] & PublicSchema["Views"]) | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    ? (PublicSchema["Tables"] & PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema["Tables"] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema["Tables"] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema["Enums"] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      board: {
        Row: {
          address: string;
          category: string;
          created_at: string;
          id: number;
          mainPhotoUrl: string;
          path: string;
          photoUrl: string[];
          title: string;
        };
        Insert: {
          address: string;
          category: string;
          created_at?: string;
          id?: number;
          mainPhotoUrl: string;
          path: string;
          photoUrl: string[];
          title: string;
        };
        Update: {
          address?: string;
          category?: string;
          created_at?: string;
          id?: number;
          mainPhotoUrl?: string;
          path?: string;
          photoUrl?: string[];
          title?: string;
        };
        Relationships: [];
      };
      estimate: {
        Row: {
          address: string;
          category: string;
          created_at: string;
          estimate: string;
          id: number;
          name: string;
          phone: string;
          photoUrl: string | null;
          status: Database["public"]["Enums"]["estimateStatus"];
          storeName: string;
        };
        Insert: {
          address: string;
          category: string;
          created_at?: string;
          estimate: string;
          id?: number;
          name: string;
          phone: string;
          photoUrl?: string | null;
          status?: Database["public"]["Enums"]["estimateStatus"];
          storeName: string;
        };
        Update: {
          address?: string;
          category?: string;
          created_at?: string;
          estimate?: string;
          id?: number;
          name?: string;
          phone?: string;
          photoUrl?: string | null;
          status?: Database["public"]["Enums"]["estimateStatus"];
          storeName?: string;
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
}

export type Tables<
  T extends keyof Database["public"]["Tables"],
  A extends keyof Database["public"]["Tables"][T],
> = Database["public"]["Tables"][T][A];

// export type Tables<
//   PublicTableNameOrOptions extends
//     | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
//     | { schema: keyof Database },
//   TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
//     ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
//         Database[PublicTableNameOrOptions["schema"]]["Views"])
//     : never = never,
// > = PublicTableNameOrOptions extends { schema: keyof Database }
//   ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
//       Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
//       Row: infer R;
//     }
//     ? R
//     : never
//   : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] & Database["public"]["Views"])
//   ? (Database["public"]["Tables"] & Database["public"]["Views"])[PublicTableNameOrOptions] extends {
//       Row: infer R;
//     }
//     ? R
//     : never
//   : never;

// export type TablesInsert<
//   PublicTableNameOrOptions extends keyof Database["public"]["Tables"] | { schema: keyof Database },
//   TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
//     ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
//     : never = never,
// > = PublicTableNameOrOptions extends { schema: keyof Database }
//   ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
//       Insert: infer I;
//     }
//     ? I
//     : never
//   : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
//   ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
//       Insert: infer I;
//     }
//     ? I
//     : never
//   : never;

// export type TablesUpdate<
//   PublicTableNameOrOptions extends keyof Database["public"]["Tables"] | { schema: keyof Database },
//   TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
//     ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
//     : never = never,
// > = PublicTableNameOrOptions extends { schema: keyof Database }
//   ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
//       Update: infer U;
//     }
//     ? U
//     : never
//   : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
//   ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
//       Update: infer U;
//     }
//     ? U
//     : never
//   : never;

// export type Enums<
//   PublicEnumNameOrOptions extends keyof Database["public"]["Enums"] | { schema: keyof Database },
//   EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
//     ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
//     : never = never,
// > = PublicEnumNameOrOptions extends { schema: keyof Database }
//   ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
//   : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
//   ? Database["public"]["Enums"][PublicEnumNameOrOptions]
//   : never;

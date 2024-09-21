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
      admin: {
        Row: {
          birthday: string | null
          created_at: string
          email: string
          id: number
          name: string
          phone: string
          userUID: string | null
        }
        Insert: {
          birthday?: string | null
          created_at?: string
          email: string
          id?: number
          name: string
          phone: string
          userUID?: string | null
        }
        Update: {
          birthday?: string | null
          created_at?: string
          email?: string
          id?: number
          name?: string
          phone?: string
          userUID?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_admin_userUID_fkey"
            columns: ["userUID"]
            isOneToOne: false
            referencedRelation: "identities"
            referencedColumns: ["id"]
          },
        ]
      }
      board: {
        Row: {
          address: string
          categoryId: number | null
          created_at: string
          done: string[] | null
          id: number
          photoUrl: string[]
          signType: string | null
          signTypeId: number | null
          subTitle: string
          title: string
          type: Database["public"]["Enums"]["postType"]
        }
        Insert: {
          address: string
          categoryId?: number | null
          created_at?: string
          done?: string[] | null
          id?: number
          photoUrl: string[]
          signType?: string | null
          signTypeId?: number | null
          subTitle: string
          title: string
          type?: Database["public"]["Enums"]["postType"]
        }
        Update: {
          address?: string
          categoryId?: number | null
          created_at?: string
          done?: string[] | null
          id?: number
          photoUrl?: string[]
          signType?: string | null
          signTypeId?: number | null
          subTitle?: string
          title?: string
          type?: Database["public"]["Enums"]["postType"]
        }
        Relationships: [
          {
            foreignKeyName: "board_categoryId_fkey"
            columns: ["categoryId"]
            isOneToOne: false
            referencedRelation: "category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "board_signType_fkey"
            columns: ["signType"]
            isOneToOne: false
            referencedRelation: "sign"
            referencedColumns: ["eng_name"]
          },
          {
            foreignKeyName: "board_signTypeId_fkey"
            columns: ["signTypeId"]
            isOneToOne: false
            referencedRelation: "sign"
            referencedColumns: ["id"]
          },
        ]
      }
      category: {
        Row: {
          created_at: string
          eng_name: string | null
          id: number
          index: number | null
          kor_name: string | null
        }
        Insert: {
          created_at?: string
          eng_name?: string | null
          id?: number
          index?: number | null
          kor_name?: string | null
        }
        Update: {
          created_at?: string
          eng_name?: string | null
          id?: number
          index?: number | null
          kor_name?: string | null
        }
        Relationships: []
      }
      estimate: {
        Row: {
          address: string
          created_at: string
          id: number
          inquiryContent: string
          isLogoDesign: string | null
          openDate: string | null
          phone: string
          photoUrl: string[] | null
          status: Database["public"]["Enums"]["estimateStatus"]
          storeCategory: string
          storeName: string
          storePhoto: string[] | null
          workDate: string | null
        }
        Insert: {
          address: string
          created_at?: string
          id?: number
          inquiryContent: string
          isLogoDesign?: string | null
          openDate?: string | null
          phone: string
          photoUrl?: string[] | null
          status?: Database["public"]["Enums"]["estimateStatus"]
          storeCategory: string
          storeName: string
          storePhoto?: string[] | null
          workDate?: string | null
        }
        Update: {
          address?: string
          created_at?: string
          id?: number
          inquiryContent?: string
          isLogoDesign?: string | null
          openDate?: string | null
          phone?: string
          photoUrl?: string[] | null
          status?: Database["public"]["Enums"]["estimateStatus"]
          storeCategory?: string
          storeName?: string
          storePhoto?: string[] | null
          workDate?: string | null
        }
        Relationships: []
      }
      mainPosts: {
        Row: {
          created_at: string
          id: number
          position: number | null
          postId: number
        }
        Insert: {
          created_at?: string
          id?: number
          position?: number | null
          postId: number
        }
        Update: {
          created_at?: string
          id?: number
          position?: number | null
          postId?: number
        }
        Relationships: [
          {
            foreignKeyName: "mainPosts_postId_fkey"
            columns: ["postId"]
            isOneToOne: false
            referencedRelation: "board"
            referencedColumns: ["id"]
          },
        ]
      }
      sign: {
        Row: {
          created_at: string
          eng_name: string
          id: number
          kor_name: string
        }
        Insert: {
          created_at?: string
          eng_name: string
          id?: number
          kor_name: string
        }
        Update: {
          created_at?: string
          eng_name?: string
          id?: number
          kor_name?: string
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
      estimateStatus: "confirm" | "done" | "hidden" | "unconfirmed"
      postType: "signage" | "branding"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

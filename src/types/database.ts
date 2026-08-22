export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      cities: {
        Row: {
          id: string;
          name: string;
          country: string;
          country_code: string | null;
          description: string | null;
          image_url: string | null;
          latitude: number | null;
          longitude: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          country: string;
          country_code?: string | null;
          description?: string | null;
          image_url?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          country?: string;
          country_code?: string | null;
          description?: string | null;
          image_url?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          created_at?: string;
        };
        Relationships: [];
      };
      trips: {
        Row: {
          id: string;
          owner_id: string;
          title: string;
          description: string | null;
          start_date: string | null;
          end_date: string | null;
          budget: number | null;
          currency: string;
          is_public: boolean;
          share_token: string | null;
          cover_image_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          owner_id: string;
          title: string;
          description?: string | null;
          start_date?: string | null;
          end_date?: string | null;
          budget?: number | null;
          currency?: string;
          is_public?: boolean;
          share_token?: string | null;
          cover_image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          owner_id?: string;
          title?: string;
          description?: string | null;
          start_date?: string | null;
          end_date?: string | null;
          budget?: number | null;
          currency?: string;
          is_public?: boolean;
          share_token?: string | null;
          cover_image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "trips_owner_id_fkey";
            columns: ["owner_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      trip_stops: {
        Row: {
          id: string;
          trip_id: string;
          city_id: string;
          stop_order: number;
          arrival_date: string | null;
          departure_date: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          trip_id: string;
          city_id: string;
          stop_order: number;
          arrival_date?: string | null;
          departure_date?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          trip_id?: string;
          city_id?: string;
          stop_order?: number;
          arrival_date?: string | null;
          departure_date?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "trip_stops_trip_id_fkey";
            columns: ["trip_id"];
            isOneToOne: false;
            referencedRelation: "trips";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "trip_stops_city_id_fkey";
            columns: ["city_id"];
            isOneToOne: false;
            referencedRelation: "cities";
            referencedColumns: ["id"];
          }
        ];
      };
      activities: {
        Row: {
          id: string;
          city_id: string;
          name: string;
          description: string | null;
          category: string | null;
          estimated_cost: number | null;
          currency: string;
          location: string | null;
          image_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          city_id: string;
          name: string;
          description?: string | null;
          category?: string | null;
          estimated_cost?: number | null;
          currency?: string;
          location?: string | null;
          image_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          city_id?: string;
          name?: string;
          description?: string | null;
          category?: string | null;
          estimated_cost?: number | null;
          currency?: string;
          location?: string | null;
          image_url?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "activities_city_id_fkey";
            columns: ["city_id"];
            isOneToOne: false;
            referencedRelation: "cities";
            referencedColumns: ["id"];
          }
        ];
      };
      trip_activities: {
        Row: {
          id: string;
          trip_stop_id: string;
          activity_id: string | null;
          custom_name: string | null;
          custom_cost: number | null;
          scheduled_date: string | null;
          notes: string | null;
          status: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          trip_stop_id: string;
          activity_id?: string | null;
          custom_name?: string | null;
          custom_cost?: number | null;
          scheduled_date?: string | null;
          notes?: string | null;
          status?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          trip_stop_id?: string;
          activity_id?: string | null;
          custom_name?: string | null;
          custom_cost?: number | null;
          scheduled_date?: string | null;
          notes?: string | null;
          status?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "trip_activities_trip_stop_id_fkey";
            columns: ["trip_stop_id"];
            isOneToOne: false;
            referencedRelation: "trip_stops";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "trip_activities_activity_id_fkey";
            columns: ["activity_id"];
            isOneToOne: false;
            referencedRelation: "activities";
            referencedColumns: ["id"];
          }
        ];
      };
      expenses: {
        Row: {
          id: string;
          trip_id: string;
          trip_stop_id: string | null;
          category: string;
          amount: number;
          currency: string;
          description: string | null;
          date: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          trip_id: string;
          trip_stop_id?: string | null;
          category: string;
          amount: number;
          currency?: string;
          description?: string | null;
          date: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          trip_id?: string;
          trip_stop_id?: string | null;
          category?: string;
          amount?: number;
          currency?: string;
          description?: string | null;
          date?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "expenses_trip_id_fkey";
            columns: ["trip_id"];
            isOneToOne: false;
            referencedRelation: "trips";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "expenses_trip_stop_id_fkey";
            columns: ["trip_stop_id"];
            isOneToOne: false;
            referencedRelation: "trip_stops";
            referencedColumns: ["id"];
          }
        ];
      };
      saved_destinations: {
        Row: {
          id: string;
          user_id: string;
          city_id: string;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          city_id: string;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          city_id?: string;
          notes?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "saved_destinations_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "saved_destinations_city_id_fkey";
            columns: ["city_id"];
            isOneToOne: false;
            referencedRelation: "cities";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

// Convenience Type Aliases
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type ProfileInsert = Database["public"]["Tables"]["profiles"]["Insert"];
export type ProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"];

export type City = Database["public"]["Tables"]["cities"]["Row"];
export type CityInsert = Database["public"]["Tables"]["cities"]["Insert"];
export type CityUpdate = Database["public"]["Tables"]["cities"]["Update"];

export type Trip = Database["public"]["Tables"]["trips"]["Row"];
export type TripInsert = Database["public"]["Tables"]["trips"]["Insert"];
export type TripUpdate = Database["public"]["Tables"]["trips"]["Update"];

export type TripStop = Database["public"]["Tables"]["trip_stops"]["Row"];
export type TripStopInsert = Database["public"]["Tables"]["trip_stops"]["Insert"];
export type TripStopUpdate = Database["public"]["Tables"]["trip_stops"]["Update"];

export type Activity = Database["public"]["Tables"]["activities"]["Row"];
export type ActivityInsert = Database["public"]["Tables"]["activities"]["Insert"];
export type ActivityUpdate = Database["public"]["Tables"]["activities"]["Update"];

export type TripActivity = Database["public"]["Tables"]["trip_activities"]["Row"];
export type TripActivityInsert = Database["public"]["Tables"]["trip_activities"]["Insert"];
export type TripActivityUpdate = Database["public"]["Tables"]["trip_activities"]["Update"];

export type Expense = Database["public"]["Tables"]["expenses"]["Row"];
export type ExpenseInsert = Database["public"]["Tables"]["expenses"]["Insert"];
export type ExpenseUpdate = Database["public"]["Tables"]["expenses"]["Update"];

export type SavedDestination = Database["public"]["Tables"]["saved_destinations"]["Row"];
export type SavedDestinationInsert = Database["public"]["Tables"]["saved_destinations"]["Insert"];
export type SavedDestinationUpdate = Database["public"]["Tables"]["saved_destinations"]["Update"];

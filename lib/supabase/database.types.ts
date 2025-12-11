/**
 * TypeScript type definitions for Supabase database tables
 *
 * These types match the database schema defined in schema.sql
 * Use these for type-safe database operations
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          created_at?: string
        }
      }
      products: {
        Row: {
          id: string
          category_id: string
          name: string
          slug: string
          short_description: string
          description: string | null
          price: number
          stock: number
          is_featured: boolean
          is_active: boolean
          thumbnail_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          category_id: string
          name: string
          slug: string
          short_description: string
          description?: string | null
          price: number
          stock?: number
          is_featured?: boolean
          is_active?: boolean
          thumbnail_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          category_id?: string
          name?: string
          slug?: string
          short_description?: string
          description?: string | null
          price?: number
          stock?: number
          is_featured?: boolean
          is_active?: boolean
          thumbnail_url?: string | null
          created_at?: string
        }
      }
      customers: {
        Row: {
          id: string
          user_id: string | null
          name: string
          email: string
          phone: string | null
          address: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          name: string
          email: string
          phone?: string | null
          address?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          name?: string
          email?: string
          phone?: string | null
          address?: string | null
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          customer_id: string | null
          status: 'pending' | 'paid' | 'processing' | 'shipped' | 'completed' | 'cancelled'
          total_amount: number
          payment_method: string
          note: string | null
          created_at: string
        }
        Insert: {
          id?: string
          customer_id?: string | null
          status?: 'pending' | 'paid' | 'processing' | 'shipped' | 'completed' | 'cancelled'
          total_amount: number
          payment_method: string
          note?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          customer_id?: string | null
          status?: 'pending' | 'paid' | 'processing' | 'shipped' | 'completed' | 'cancelled'
          total_amount?: number
          payment_method?: string
          note?: string | null
          created_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          quantity: number
          unit_price: number
          subtotal: number
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          quantity: number
          unit_price: number
          subtotal: number
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          quantity?: number
          unit_price?: number
          subtotal?: number
        }
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
  }
}

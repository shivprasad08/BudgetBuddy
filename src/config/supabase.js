import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('🔧 Supabase Config:', {
  url: supabaseUrl ? supabaseUrl.substring(0, 30) + '...' : 'NOT SET',
  keyExists: !!supabaseAnonKey,
  keyLength: supabaseAnonKey?.length || 0
});

// Check if valid credentials are provided (not placeholders)
const hasValidCredentials = 
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your_supabase') && 
  !supabaseAnonKey.includes('your_supabase');

console.log('✅ Using real Supabase:', hasValidCredentials);

// Create a real client or a mock client
export const supabase = hasValidCredentials 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      // Mock Supabase client for development without credentials
      from: (table) => {
        let insertData = null;
        const mockQuery = {
          select: function() { return this; },
          insert: function(data) { 
            insertData = Array.isArray(data) ? data[0] : data;
            return this; 
          },
          update: function() { 
            return {
              eq: () => Promise.resolve({ data: null, error: null })
            };
          },
          delete: function() { 
            return {
              eq: () => Promise.resolve({ data: null, error: null })
            };
          },
          eq: function() { return this; },
          order: function() { return this; },
          single: function() {
            // Return the inserted data with a mock ID
            const result = insertData ? {
              ...insertData,
              id: Date.now(),
              created_at: new Date().toISOString()
            } : null;
            return Promise.resolve({ data: result, error: null });
          },
          then: function(resolve) {
            return Promise.resolve({ data: [], error: null }).then(resolve);
          }
        };
        return mockQuery;
      }
    };

// Log warning if using mock client
if (!hasValidCredentials) {
  console.warn('⚠️ Supabase credentials not configured. Using mock data. Update your .env file with real credentials.');
}

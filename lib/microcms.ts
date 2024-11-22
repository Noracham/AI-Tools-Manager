import { createClient } from 'microcms-js-sdk';
import { Tool } from '@/types';

if (!process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN) {
  throw new Error('NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN is not set');
}

if (!process.env.NEXT_PUBLIC_MICROCMS_API_KEY) {
  throw new Error('NEXT_PUBLIC_MICROCMS_API_KEY is not set');
}

export const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.NEXT_PUBLIC_MICROCMS_API_KEY,
});

interface MicroCMSListResponse<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}

interface MicroCMSToolContent {
  id: string;
  name: string;
  description: string;
  category: string[];
  price: string;
  url?: string;
  tutorial?: string;
}

export async function getTools(): Promise<Tool[]> {
  try {
    const response = await client.get<MicroCMSListResponse<MicroCMSToolContent>>({
      endpoint: 'tools',
      queries: { 
        limit: 100,
      },
    });

    return response.contents.map((content) => ({
      id: content.id,
      name: content.name,
      description: content.description,
      category: content.category || [],
      price: content.price || '',
      favorite: false,
      url: content.url,
      tutorial: content.tutorial,
    }));
  } catch (error) {
    console.error('Failed to fetch tools:', error);
    return [];
  }
}

export async function getCategories(): Promise<string[]> {
  try {
    const response = await client.get<MicroCMSListResponse<MicroCMSToolContent>>({
      endpoint: 'tools',
      queries: { 
        fields: ['category'],
        limit: 100
      },
    });

    const categories = Array.from(new Set(
      response.contents.flatMap(content => content.category || [])
    ));

    return categories.sort((a, b) => a.localeCompare(b));
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
}
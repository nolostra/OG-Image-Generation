export interface FetchOGImageParams {
    title: string;
    content: string;
    image: string | null;
  }
  
  export interface FetchOGImageResponse {
    ogImageUrl: string;
  }
  
  export const fetchOGImage = async (params: FetchOGImageParams): Promise<FetchOGImageResponse> => {
    const response = await fetch('/api/generate-og-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    
    if (!response.ok) {
      throw new Error('Failed to generate OG image');
    }
    
    const data: FetchOGImageResponse = await response.json();
    return data;
  };
  
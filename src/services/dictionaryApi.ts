const MW_API_BASE_URL = 'https://dictionaryapi.com/api/v3/references/thesaurus/json/';
const MW_API_KEY = '2ba0d7ce-79d9-451c-9d16-c3a6ed72e387';
const RANDOM_WORD_API_URL = 'https://random-word-form.herokuapp.com/random/adjective';

export async function fetchRandomWord(): Promise<string> {
  try {
    const response = await fetch(RANDOM_WORD_API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch random word');
    }
    const data = await response.json();
    return data[0]; // The API returns an array with a single word
  } catch (error) {
    console.error('Error fetching random word:', error);
    throw error;
  }
}

export async function validateSynonym(word: string, synonym: string): Promise<boolean> {
  try {
    const response = await fetch(`${MW_API_BASE_URL}${word}?key=${MW_API_KEY}`);
    const data = await response.json();
    
    if (!Array.isArray(data) || data.length === 0 || typeof data[0] === 'string') {
      throw new Error('Word not found or invalid response');
    }

    const synonyms = data.flatMap((entry: DictionaryEntry) => 
      entry.meta.syns.flat()
    );

    return synonyms.map(s => s.toLowerCase()).includes(synonym.toLowerCase());
  } catch (error) {
    console.error('Error validating synonym:', error);
    return false;
  }
}

interface DictionaryEntry {
  meta: {
    id: string;
    uuid: string;
    src: string;
    section: string;
    target: {
      tuuid: string;
      tsrc: string;
    };
    stems: string[];
    syns: string[][];
    ants: string[][];
    offensive: boolean;
  };
  hwi: {
    hw: string;
  };
  fl: string;
  def: Array<{
    sseq: Array<Array<Array<string | { dt: Array<Array<string | { t: string }>> }>>>;
  }>;
  shortdef: string[];
}

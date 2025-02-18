import { faker } from '@faker-js/faker';

const MW_API_BASE_URL = 'https://dictionaryapi.com/api/v3/references/thesaurus/json/';
const MW_API_KEY = process.env.NEXT_PUBLIC_MW_API_KEY;

export async function fetchRandomWord(): Promise<string> {
  try {
    return faker.word.adjective();
  } catch (error) {
    console.error('Error generating random word:', error);
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

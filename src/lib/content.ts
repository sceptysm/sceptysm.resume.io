import YAML from 'yaml';


/**
 * Metadata for a work item.
 */
export type WorkItem = {
  title: string;
  company: string;
  location: string;
  icon?: string;
  startDate: string;
  endDate?: string | null;
  description?: string;
  link?: string;
  linkMessage?: string;
};


/**
 * Metadata for an education item. 
 */
export type EducationItem = {
  program: string;
  institution: string;
  location: string;
  icon?: string;
  startDate: string;
  endDate?: string;
  description?: string;
  link?: string;
  linkMessage?: string;
};

/**
 * Metadata for an activity item.
 */
export type ActivityItem = {
  name: string;
  icon?: string;
  description?: string;
  link?: string;
  startDate?: string;
  endDate?: string;
  linkMessage?: string;
};

/**
 * Metadata for a blog entry.
 */
export type BlogMeta = { 
  title: string;
  date: string;
  tags?: string[];
  excerpt?: string 
};

// ==========================================================================================


// Parsing functions


// ==========================================================================================

export function parseResume(raw: string): { work: WorkItem[]; education: EducationItem[] } {
  const doc = YAML.parse(raw) as any;

  return {
    work: Array.isArray(doc.work) ? doc.work : [],
    education: Array.isArray(doc.education) ? doc.education : [],
  };
}

export function parseActivities(raw: string): { activities: ActivityItem[] } {
  const doc = YAML.parse(raw) as any;

  return {
    activities: Array.isArray(doc.activities) ? doc.activities : [],
  };
}

export function parseMarkdown(raw: string): { meta: BlogMeta; content: string } {

  // Matches leading ---\n...yaml...\n---\n then the rest of content
  
  const fmRegex = /^---\s*\n([\s\S]*?)\n---\s*\n?/;
  const match = fmRegex.exec(raw); 

  // Frontmatter found
  if (match) {

    const yamlText = match[1] ?? '';
    let meta: BlogMeta = { title: 'Untitled', date: '1970-01-01' };
    
    try {
      
      const parsed = YAML.parse(yamlText) as Partial<BlogMeta> | undefined;

      meta = {
        title: parsed?.title ?? 'Untitled',
        date: parsed?.date ?? '1970-01-01',

        tags: Array.isArray(parsed?.tags) ? parsed?.tags : [],

        excerpt: typeof parsed?.excerpt === 'string' ? parsed?.excerpt : undefined,
      };

    } catch (e) {
      // fall back to defaults on YAML errors
      meta = { title: 'Untitled', date: '1970-01-01' };
    }
    
    const content = raw.slice(match[0].length);
    return { meta, content };
  }

  // No frontmatter
  return { meta: { title: 'Untitled', date: '1970-01-01' }, content: raw };
}

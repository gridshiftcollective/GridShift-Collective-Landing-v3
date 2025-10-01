import fs from 'fs';
import path from 'path';
import { TeamMember } from './types';

const teamDirectory = path.join(process.cwd(), 'src/content/team');

export function getAllTeamMembers(): TeamMember[] {
  const fileNames = fs.readdirSync(teamDirectory);
  const allMembers = fileNames
    .filter(fileName => fileName.endsWith('.json'))
    .map(fileName => {
      const fullPath = path.join(teamDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const member = JSON.parse(fileContents);

      return member as TeamMember;
    })
    .filter(member => !member.draft && !member.hidden)
    .sort((a, b) => b.homeWeight - a.homeWeight);

  return allMembers;
}

export function getTeamMember(slug: string): TeamMember | null {
  try {
    const fullPath = path.join(teamDirectory, `${slug}.json`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const member = JSON.parse(fileContents);

    return member as TeamMember;
  } catch {
    return null;
  }
}

export function getFeaturedTeamMembers(limit: number = 3): TeamMember[] {
  return getAllTeamMembers()
    .filter(member => member.featuredOnHome)
    .sort((a, b) => b.homeWeight - a.homeWeight)
    .slice(0, limit);
}

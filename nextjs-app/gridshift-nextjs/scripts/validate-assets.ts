#!/usr/bin/env tsx

/**
 * Asset Path Validation Script
 *
 * This script validates that all asset paths referenced in content files actually exist.
 * It's designed to run in CI to catch broken asset references before deployment.
 */

import fs from 'fs';
import path from 'path';
import { getAllProjects, getAllTeamMembers } from '../src/lib/content';

const publicDir = path.join(process.cwd(), 'public');

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

function validateImagePath(imagePath: string, context: string): { exists: boolean; error?: string } {
  if (!imagePath) {
    return { exists: false, error: `${context}: Empty image path` };
  }

  // Convert public paths to file system paths
  const relativePath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  const fullPath = path.join(publicDir, relativePath);

  try {
    const exists = fs.existsSync(fullPath);
    if (!exists) {
      return { exists: false, error: `${context}: Image not found at ${fullPath}` };
    }
    return { exists: true };
  } catch (error) {
    return { exists: false, error: `${context}: Error checking path ${fullPath}: ${error instanceof Error ? error.message : String(error)}` };
  }
}

function validateProjectAssets(project: any): ValidationResult {
  const result: ValidationResult = {
    isValid: true,
    errors: [],
    warnings: []
  };

  const context = `Project "${project.title}" (${project.id})`;

  // Validate main project image
  if (project.image) {
    const validation = validateImagePath(project.image, `${context} - main image`);
    if (!validation.exists) {
      result.errors.push(validation.error!);
      result.isValid = false;
    }
  }

  // Validate gallery images
  if (project.gallery && Array.isArray(project.gallery)) {
    project.gallery.forEach((image: string, index: number) => {
      const validation = validateImagePath(image, `${context} - gallery image ${index + 1}`);
      if (!validation.exists) {
        result.errors.push(validation.error!);
        result.isValid = false;
      }
    });
  }

  // Validate SEO OG image
  if (project.seo?.ogImage) {
    const validation = validateImagePath(project.seo.ogImage, `${context} - SEO OG image`);
    if (!validation.exists) {
      result.warnings.push(validation.error!);
      // Warnings don't fail validation, but should be addressed
    }
  }

  return result;
}

function validateTeamAssets(member: any): ValidationResult {
  const result: ValidationResult = {
    isValid: true,
    errors: [],
    warnings: []
  };

  const context = `Team member "${member.name}" (${member.id})`;

  // Validate profile image
  if (member.image) {
    const validation = validateImagePath(member.image, `${context} - profile image`);
    if (!validation.exists) {
      result.errors.push(validation.error!);
      result.isValid = false;
    }
  }

  // Validate SEO OG image
  if (member.seo?.ogImage) {
    const validation = validateImagePath(member.seo.ogImage, `${context} - SEO OG image`);
    if (!validation.exists) {
      result.warnings.push(validation.error!);
      // Warnings don't fail validation, but should be addressed
    }
  }

  return result;
}

async function main() {
  console.log('🔍 Validating asset paths...\n');

  const allResults: ValidationResult[] = [];
  let totalErrors = 0;
  let totalWarnings = 0;

  // Validate portfolio projects
  console.log('📁 Checking portfolio projects...');
  const projects = getAllProjects();
  for (const project of projects) {
    const result = validateProjectAssets(project);
    allResults.push(result);
    if (!result.isValid) totalErrors += result.errors.length;
    totalWarnings += result.warnings.length;

    if (!result.isValid || result.warnings.length > 0) {
      console.log(`  ❌ ${project.title}`);
      result.errors.forEach(error => console.log(`    🔴 ${error}`));
      result.warnings.forEach(warning => console.log(`    🟡 ${warning}`));
    } else {
      console.log(`  ✅ ${project.title}`);
    }
  }

  // Validate team members
  console.log('\n👥 Checking team members...');
  const teamMembers = getAllTeamMembers();
  for (const member of teamMembers) {
    const result = validateTeamAssets(member);
    allResults.push(result);
    if (!result.isValid) totalErrors += result.errors.length;
    totalWarnings += result.warnings.length;

    if (!result.isValid || result.warnings.length > 0) {
      console.log(`  ❌ ${member.name}`);
      result.errors.forEach(error => console.log(`    🔴 ${error}`));
      result.warnings.forEach(warning => console.log(`    🟡 ${warning}`));
    } else {
      console.log(`  ✅ ${member.name}`);
    }
  }

  // Summary
  console.log('\n📊 Validation Summary:');
  console.log(`   Projects checked: ${projects.length}`);
  console.log(`   Team members checked: ${teamMembers.length}`);
  console.log(`   Total errors: ${totalErrors}`);
  console.log(`   Total warnings: ${totalWarnings}`);

  if (totalErrors > 0) {
    console.log('\n❌ Asset validation FAILED - found broken asset references!');
    process.exit(1);
  } else if (totalWarnings > 0) {
    console.log('\n⚠️  Asset validation PASSED with warnings - consider fixing missing SEO images');
    process.exit(0);
  } else {
    console.log('\n✅ Asset validation PASSED - all assets found!');
    process.exit(0);
  }
}

// Handle errors
process.on('uncaughtException', (error) => {
  console.error('💥 Uncaught exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Unhandled rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

main().catch((error) => {
  console.error('💥 Script failed:', error);
  process.exit(1);
});

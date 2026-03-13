import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch(
      'https://api.github.com/users/surajydev/repos?sort=updated&per_page=20',
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      return NextResponse.json([], { status: 200 });
    }

    const repos = await res.json();

    interface GithubRepo {
      fork: boolean;
      name: string;
      description: string | null;
      language: string | null;
      stargazers_count: number;
      html_url: string;
      updated_at: string;
    }

    const filtered = repos
      .filter((r: GithubRepo) => !r.fork)
      .slice(0, 6)
      .map((r: GithubRepo) => ({
        name: r.name,
        description: r.description,
        language: r.language,
        stars: r.stargazers_count,
        url: r.html_url,
        updatedAt: r.updated_at,
      }));

    return NextResponse.json(filtered);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}

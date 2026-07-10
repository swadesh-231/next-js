import { Trash2 } from "lucide-react";

import { createPost, deletePost, getAllPosts } from "@/actions/post";
import { Button } from "@/components/ui/button";

const dateFormatter = new Intl.DateTimeFormat("en", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export default async function PostsPage() {
  const posts = await getAllPosts();

  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-16">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">Posts</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {posts.length === 0
            ? "Nothing here yet — write the first one."
            : `${posts.length} ${posts.length === 1 ? "post" : "posts"} published.`}
        </p>
      </header>

      <form
        action={createPost}
        className="mb-12 rounded-xl border border-border bg-card p-5 shadow-sm"
      >
        <div className="space-y-3">
          <input
            name="title"
            required
            placeholder="Title"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-base font-medium outline-none transition-colors placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          />
          <textarea
            name="content"
            rows={4}
            placeholder="Write something…"
            className="w-full resize-y rounded-lg border border-border bg-background px-3 py-2 text-sm leading-relaxed outline-none transition-colors placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          />
        </div>
        <div className="mt-4 flex justify-end">
          <Button type="submit" size="lg">
            Publish
          </Button>
        </div>
      </form>

      {posts.length > 0 && (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li
              key={post.id}
              className="group rounded-xl border border-border bg-card p-5 shadow-sm transition-colors hover:border-ring/40"
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-lg font-semibold leading-snug tracking-tight">
                  {post.title}
                </h2>
                <form action={deletePost.bind(null, post.id)}>
                  <Button
                    type="submit"
                    variant="ghost"
                    size="icon-sm"
                    aria-label="Delete post"
                    className="text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-destructive focus-visible:opacity-100"
                  >
                    <Trash2 />
                  </Button>
                </form>
              </div>

              {post.content && (
                <p className="mt-2 text-sm leading-relaxed whitespace-pre-wrap text-muted-foreground">
                  {post.content}
                </p>
              )}

              <time className="mt-4 block text-xs text-muted-foreground/70">
                {dateFormatter.format(post.createdAt)}
              </time>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

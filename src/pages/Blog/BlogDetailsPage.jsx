import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBlog } from '../../hooks/useBlogs';
import Container from '../../components/common/Container';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import Button from '../../components/common/Button';
import { ArrowLeft, Calendar, User, Clock, Bookmark } from 'lucide-react';
import { formatDate } from '../../utils/helpers';
import { ROUTES } from '../../utils/routes';

export const BlogDetailsPage = () => {
  const { slug } = useParams();
  const { data: blog, isLoading, error, refetch } = useBlog(slug);

  if (isLoading) {
    return <LoadingSpinner size="lg" className="min-h-[60vh]" />;
  }

  if (error) {
    return <ErrorMessage message={error.message} onRetry={refetch} className="my-20" />;
  }

  if (!blog) {
    return (
      <Container className="py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 font-display">Article Not Found</h2>
        <p className="text-gray-600 mb-6">The requested publication could not be found in our resource hub.</p>
        <Link to={ROUTES.BLOG}>
          <Button variant="outline">Back to Blog</Button>
        </Link>
      </Container>
    );
  }

  return (
    <div className="py-16">
      <Container className="max-w-4xl">
        {/* Back Link */}
        <Link
          to={ROUTES.BLOG}
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Articles
        </Link>

        <article className="bg-white rounded-3xl border border-gray-100 shadow-md overflow-hidden space-y-8 pb-12">
          {/* Header Banner */}
          <div className="relative h-[380px]">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-white space-y-4">
              <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-teal-300 bg-teal-950/60 px-3 py-1 rounded border border-teal-800/40 backdrop-blur-sm">
                {blog.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight font-display leading-tight">
                {blog.title}
              </h1>
              {/* Meta metrics */}
              <div className="flex flex-wrap gap-4 text-xs text-slate-300 font-semibold uppercase tracking-wider pt-2">
                <span className="flex items-center gap-1.5">
                  <User className="h-4 w-4 text-secondary" /> {blog.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-secondary" /> {formatDate(blog.date)}
                </span>
                <span className="flex items-center gap-1.5 font-mono">
                  <Clock className="h-4 w-4 text-secondary" /> {blog.readTime}
                </span>
              </div>
            </div>
          </div>

          {/* Article Text Content */}
          <div className="px-8 md:px-12 space-y-6">
            <p className="text-lg text-slate-700 leading-relaxed font-medium italic border-l-4 border-primary pl-4 py-1">
              {blog.summary}
            </p>
            <div className="text-slate-600 leading-relaxed text-sm space-y-4 pt-4 border-t border-slate-100">
              <p>{blog.content}</p>
              <p>
                In subsequent clinical guides, we will detail specific sensory adaptations and therapeutic methods for developmental milestones. We recommend checking back regularly for reviews, case summaries, and home-friendly intervention advice.
              </p>
            </div>
          </div>
        </article>
      </Container>
    </div>
  );
};

export default BlogDetailsPage;

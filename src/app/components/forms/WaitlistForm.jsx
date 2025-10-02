'use client';

import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { waitlistSchema } from '@/lib/validations/waitlistSchema';
import api from '@/utils/axios';

export default function WaitlistForm({ onSuccess }) {
  const [serverMsg, setServerMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const successRef = useRef(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(waitlistSchema),
    defaultValues: { email: '', website: '', startedAt: Date.now() },
    mode: 'onTouched',
  });

  useEffect(() => {
    setValue('startedAt', Date.now());
  }, [setValue]);

  const onSubmit = async (data) => {
    setServerMsg('');
    setSubmitting(true);
    try {
      // api.post returns res.data directly due to interceptor
      const payload = await api.post('/api/waitlist', data);
      // Expecting: { ok: true, deduped?: boolean }
      if (payload?.ok) {
        reset({ email: '', website: '', startedAt: Date.now() });
        setServerMsg(
          payload?.deduped
            ? 'Looks like you’re already on the list, thank you!'
            : 'You’re in! 🎉 We’ll send early access and founder updates soon.'
        );
        onSuccess?.();
        setTimeout(() => successRef.current?.focus(), 0);
        return;
      }
      setServerMsg('Something went wrong, please try again.');
    } catch (err) {
      if (err.code === 'DUPLICATE') {
        setServerMsg('Looks like you’re already on the list, thank you!');
      } else if (err.code === 'RATE_LIMITED' || err.status === 429) {
        setServerMsg('Easy there—too many attempts from your network. Please try again in a bit.');
      } else {
        setServerMsg(err.message || 'Something went wrong, please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto] md:gap-2"
    >
      {/* Honeypot (keep empty) */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden p-0"
        {...register('website')}
      />
      {/* Min submit time */}
      <input type="hidden" {...register('startedAt', { valueAsNumber: true })} />

      <div>
        <label htmlFor="email" className="sr-only">Email</label>
        <input
          id="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Email Address"
          className="h-11 md:h-12 w-full rounded-2xl border border-border bg-surface px-4 text-base leading-[1.2] text-text placeholder:text-text-muted/70 outline-none focus:ring-2 focus:ring-ring"
          aria-invalid={!!errors.email || undefined}
          {...register('email')}
        />
        <div aria-live="polite" className="mt-1 min-h-[1.25rem] text-sm text-red-500">
          {errors.email?.message}
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        aria-busy={submitting}
        className="h-11 md:h-12 inline-flex items-center justify-center gap-2 rounded-2xl bg-brand px-5 text-sm md:text-base font-medium text-black shadow-glow outline-none transition-opacity hover:opacity-90 focus:ring-2 focus:ring-ring disabled:opacity-60"
      >
        {submitting ? (
          <>
            <Spinner />
            Joining…
          </>
        ) : (
          <>Join Waitlist</>
        )}
      </button>

      {/* Microcopy + server feedback (centered) */}
      <div className="md:col-span-2 text-center">
        <p className="text-sm text-text-muted">Grab early access to Nexbolt and snag limited-time launch discounts.</p>
        <div
          ref={successRef}
          tabIndex={serverMsg ? -1 : undefined}
          aria-live="polite"
          className="mt-2 min-h-[1.25rem] text-sm text-text"
        >
          {serverMsg}
        </div>
      </div>
    </form>
  );
}

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}

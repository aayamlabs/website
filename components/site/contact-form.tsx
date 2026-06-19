"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CircleCheckBig, Loader2, Send } from "lucide-react";

import { team } from "@/lib/team";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PROJECT_TYPES = [
  { value: "web", label: "Web app / website" },
  { value: "ai", label: "AI agent / automation" },
  { value: "mobile", label: "Mobile app" },
  { value: "software", label: "Custom software / platform" },
  { value: "other", label: "Something else" },
] as const;

const BUDGETS = [
  { value: "<5k", label: "Under $5k" },
  { value: "5-15k", label: "$5–15k" },
  { value: "15-40k", label: "$15–40k" },
  { value: "40k+", label: "$40k+" },
  { value: "not sure", label: "Not sure yet" },
] as const;

const schema = z.object({
  name: z.string().min(1, "Please enter your name."),
  email: z.string().min(1, "Please enter your email.").email("Enter a valid email."),
  projectType: z.enum(["web", "ai", "mobile", "software", "other"], {
    message: "Pick a project type.",
  }),
  budget: z.enum(["<5k", "5-15k", "15-40k", "40k+", "not sure"]).optional(),
  message: z.string().min(1, "Tell us a little about the project."),
  // Honeypot — real users never see/fill this; Web3Forms rejects if truthy.
  botcheck: z.boolean().optional(),
});

type FormValues = z.infer<typeof schema>;

type Status = "idle" | "sending" | "success" | "error";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", message: "", botcheck: false },
  });

  const onSubmit = async (data: FormValues) => {
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setStatus("error");
      setErrorMsg(
        "The form isn't configured yet — please email us directly instead."
      );
      return;
    }

    setStatus("sending");
    setErrorMsg(null);

    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New project enquiry — ${team.name}`,
          from_name: data.name,
          name: data.name,
          email: data.email,
          "Project type": data.projectType,
          Budget: data.budget ?? "—",
          message: data.message,
          botcheck: data.botcheck ?? false,
        }),
      });

      const json = await res.json().catch(() => null);

      if (res.ok && json?.success) {
        reset();
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(
          json?.message ?? "Something went wrong — please try again."
        );
      }
    } catch {
      setStatus("error");
      setErrorMsg(
        "Couldn't reach the server — check your connection or email us directly."
      );
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-card border border-border bg-ink-2 p-8 text-paper"
      >
        <CircleCheckBig className="h-8 w-8 text-volt" aria-hidden="true" />
        <p className="mt-4 font-display text-2xl font-bold tracking-tight">
          Thanks — your message is on its way.
        </p>
        <p className="mt-2 text-muted-foreground">
          We&rsquo;ve got your enquiry and will get back to you within a day. If
          it&rsquo;s urgent, email us directly at {team.email}.
        </p>
        <button
          type="button"
          onClick={() => {
            reset();
            setErrorMsg(null);
            setStatus("idle");
          }}
          className="mt-6 font-mono text-sm text-paper underline decoration-volt decoration-2 underline-offset-4"
        >
          send another
        </button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5">
      {/* Honeypot — hidden from humans; bots that fill it get rejected. */}
      <input
        type="checkbox"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        {...register("botcheck")}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Name */}
        <div className="grid gap-2">
          <Label htmlFor="cf-name" className="text-paper">
            Name
          </Label>
          <Input
            id="cf-name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "cf-name-err" : undefined}
            {...register("name")}
          />
          {errors.name && (
            <p id="cf-name-err" role="alert" className="text-sm text-destructive">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="grid gap-2">
          <Label htmlFor="cf-email" className="text-paper">
            Email
          </Label>
          <Input
            id="cf-email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "cf-email-err" : undefined}
            {...register("email")}
          />
          {errors.email && (
            <p id="cf-email-err" role="alert" className="text-sm text-destructive">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Project type */}
        <div className="grid gap-2">
          <Label htmlFor="cf-type" className="text-paper">
            Project type
          </Label>
          <Controller
            name="projectType"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id="cf-type"
                  aria-invalid={!!errors.projectType}
                  aria-describedby={errors.projectType ? "cf-type-err" : undefined}
                >
                  <SelectValue placeholder="Choose one" />
                </SelectTrigger>
                <SelectContent>
                  {PROJECT_TYPES.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.projectType && (
            <p id="cf-type-err" role="alert" className="text-sm text-destructive">
              {errors.projectType.message}
            </p>
          )}
        </div>

        {/* Budget (optional) */}
        <div className="grid gap-2">
          <Label htmlFor="cf-budget" className="text-paper">
            Budget <span className="text-muted-foreground">(optional)</span>
          </Label>
          <Controller
            name="budget"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="cf-budget">
                  <SelectValue placeholder="Choose a range" />
                </SelectTrigger>
                <SelectContent>
                  {BUDGETS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      {/* Message */}
      <div className="grid gap-2">
        <Label htmlFor="cf-message" className="text-paper">
          Message
        </Label>
        <Textarea
          id="cf-message"
          placeholder="What are you building, and what do you need?"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "cf-message-err" : undefined}
          {...register("message")}
        />
        {errors.message && (
          <p id="cf-message-err" role="alert" className="text-sm text-destructive">
            {errors.message.message}
          </p>
        )}
      </div>

      <div>
        <Button
          type="submit"
          disabled={sending}
          aria-busy={sending}
          className="bg-volt text-ink-2 hover:bg-volt/90"
        >
          {sending ? (
            <Loader2 size={16} aria-hidden="true" className="animate-spin" />
          ) : (
            <Send size={16} aria-hidden="true" />
          )}
          {sending ? "sending…" : "send message"}
        </Button>

        {status === "error" && errorMsg && (
          <p role="alert" className="mt-3 text-sm text-destructive">
            {errorMsg}
          </p>
        )}
      </div>
    </form>
  );
}

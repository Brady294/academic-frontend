import VerifyEmailClient from "@/components/auth/VerifyEmailClient";

interface VerifyEmailPageProps {
  searchParams: Promise<{
    email?: string;
  }>;
}

export default async function VerifyEmailPage({
  searchParams,
}: VerifyEmailPageProps) {
  const params = await searchParams;

  return (
    <VerifyEmailClient email={params.email ?? ""} />
  );
}
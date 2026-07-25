import AuthLayout from "@/components/auth/AuthLayout";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

interface ResetPasswordPageProps {
  searchParams: Promise<{
    token?: string;
  }>;
}

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const params = await searchParams;

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Choose a strong new password for your account."
    >
      <ResetPasswordForm token={params.token ?? ""} />
    </AuthLayout>
  );
}
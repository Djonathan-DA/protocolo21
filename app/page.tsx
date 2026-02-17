import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export default async function RootPage() {
  const cookieStore = await cookies();

  // Inicializa o cliente do Supabase no lado do servidor para ler os cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  // Verifica se existe uma sessão ativa (usuária logada)
  const { data: { session } } = await supabase.auth.getSession();

  // Lógica de Redirecionamento Ninja
  if (session) {
    // Se está logada, manda para o Dashboard / Portal da Aluna
    redirect("/home");
  } else {
    // Se não está logada, manda para o Login
    redirect("/auth/login");
  }

  // Não precisamos retornar nenhum HTML (<div>, <main>, etc.) 
  // porque o 'redirect' interrompe a renderização e envia a usuária antes.
}
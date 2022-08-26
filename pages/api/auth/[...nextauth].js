import { CredentialsProvider } from "next-auth/providers/credentials";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Moralis Auth",
            credentials: {
                message: {
                    label: "Message",
                    type: "text",
                    placeholder: "0x0",
                },
                signature: {
                    label: "Signature",
                    type: "text",
                    placeholder: "0x0",
                },
            },
            async authorize(credentials) {
                try {
                    const { message, signature } = credentials;

                    await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

                    const { address, profileId } = await Moralis.Auth.verifyMessage({
                        message,
                        signature,
                        network: 'evm',
                    }).raw;

                    const user = { address, profileId, signature };

                    return user;
                } catch (error) {
                    console.error(error);
                    return error;
                }
            },
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            user && (token.user = user);
            return token;
        },
        async session({ session, token }) {
            session.user = token.user;
            return session;
        },
    },
})
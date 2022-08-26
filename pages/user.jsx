import { getSession, signOut } from "next-auth/react"
import Head from "next/head";

function User({ user }) {
    return (
        <div>
            <Head>
                <title>{user.address}</title>
            </Head>
            <h4>User session:</h4>
            <pre>{JSON.stringify(user, null, 2)}</pre>
            <button onClick={() => signOut({ redirect: '/signin' })}>Sign out</button>
        </div>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if(!session) {
        return {
            redirect: {
                destination: '/signin',
                permanent: false,
            },
        };
    }

    return {
        props: {
            user: session.user,
        },
    };
}

export default User;
import { Badge, Button, Card, TextInput, Title } from '@tremor/react'
import { useUserActions } from '../hooks/useUsers'
import { useState } from 'react'

export function CreateNewUser() {
    const { addUser } = useUserActions()
    const [result, setResult] = useState<'ok' | 'ko' | null>(null)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault()

        setResult(null)

        const form = event.target as HTMLFormElement 
        const formData = new FormData(form)

        const name = formData.get('name') as string
        const email = formData.get('email') as string
        const github = formData.get('github') as string

        if (!name || !email || !github) {
            return setResult('ko')
        }
        addUser({ name, email, github })
        setResult('ok');
        form.reset();
    }
    return (
        <Card style={{ marginTop: "20px" }}>
            <Title>Create New User</Title>

            <form onSubmit={handleSubmit} className=''>
                <TextInput
                    placeholder='Name'
                    type='text'
                    name='name'
                    id='name'
                    required
                />
                <TextInput
                    placeholder='Email'
                    type='email'
                    name='email'
                    id='email'
                    required
                />
                <TextInput
                    placeholder='Github'
                    type='text'
                    name='github'
                    id='github'
                    required
                />

                <div>
                    <Button
                        style={{ marginTop: "20px" }}
                        type='submit'
                    >
                        Create New User
                    </Button>
                    <span>
                       {result === 'ok' && <Badge color='green' style={{ marginLeft: "10px" }}>User created</Badge>}
                       {result === 'ko' && <Badge color='red' style={{ marginLeft: "10px" }}>Error</Badge>}
                    </span>


                </div>
            </form>

        </Card>
    )
}
import React, { Component } from 'react'
import { Card, CardHeader, CardTitle } from '../ui/card'

export class clientDetails extends Component {
  render() {
    return (
        <Card className="mb-6">
        <CardHeader>
          <CardTitle>Informações Pessoais</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  name="nome"
                  value={cliente.nome}
                  onChange={handleChange}
                  disabled={!editando}
                />
              </div>
              <div>
                <Label htmlFor="telemovel">Telemóvel</Label>
                <Input
                  id="telemovel"
                  name="telemovel"
                  value={cliente.telemovel}
                  onChange={handleChange}
                  disabled={!editando}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="dataInscricao">Data de Inscrição</Label>
              <Input
                id="dataInscricao"
                name="dataInscricao"
                value={cliente.dataInscricao}
                onChange={handleChange}
                disabled={!editando}
              />
            </div>
          </div>
          <div className="mt-4">
            {editando ? (
              <Button onClick={handleSave}>Salvar</Button>
            ) : (
              <Button onClick={handleEdit}>Editar</Button>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }
}

export default clientDetails
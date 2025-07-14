import { Request, Response } from 'express';
import { prisma } from '../../prisma/prisma';

export class EmpresasController {
  static async listarEmpresas(req: Request, res: Response) {
    try {
      const empresas = await prisma.empresa.findMany({
        include: {
          acoes: true,
          ods: {
            include: {
              ods: true
            }
          }
        }
      });

      res.json(empresas);
    } catch (error) {
      console.error('Erro ao listar empresas:', error);
      res.status(500).json({ error: 'Erro ao listar empresas' });
    }
  }

  static async buscarEmpresaPorId(req: Request, res: Response) {
    try {
      const empresa = await prisma.empresa.findUnique({
        where: { id: Number(req.params.id) },
        include: {
          acoes: true,
          ods: {
            include: {
              ods: true
            }
          }
        }
      });

      if (!empresa) {
        return res.status(404).json({ error: 'Empresa não encontrada' });
      }

      res.json(empresa);
    } catch (error) {
      console.error('Erro ao buscar empresa' );
      res.status(500).json({ error: 'Erro ao buscar empresa' });
    }
  }

  static async criarEmpresa(req: Request, res: Response) {
    const { nome, 
            cnpj, 
            email,
            senha, 
            colaboradores, 
            odsIds 
          } = req.body;

    try {
      const novaEmpresa = await prisma.empresa.create({
        data: {
          nome,
          cnpj,
          email,
          senha,
          colaboradores,
          ods: {
            create: odsIds?.map((id: number) => ({
              ods: { connect: { id } }
            }))
          }
        }
      });

      res.status(201).json(novaEmpresa);
    } catch (error) {
      res.status(400).json({ error: 'Erro ao criar empresa', detalhe: (error as Error).message });
    }
  }

  static async atualizarEmpresa(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { nome, cnpj, usuarioId, odsIds } = req.body;

    try {
      // Remove ODSs antigos e atualiza com os novos
      await prisma.empresaODS.deleteMany({ where: { empresaId: id } });

      const empresaAtualizada = await prisma.empresa.update({
        where: { id },
        data: {
          nome,
          cnpj,
          ods: {
            create: odsIds?.map((id: number) => ({
              ods: { connect: { id } }
            }))
          }
        }
      });

      res.json(empresaAtualizada);
    } catch (error) {
      res.status(404).json({ error: 'Empresa não encontrada ou erro ao atualizar' });
    }
  }

  static async deletarEmpresa(req: Request, res: Response) {
    const id = Number(req.params.id);

    try {
      await prisma.empresa.delete({ where: { id } });
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: 'Empresa não encontrada ou erro ao deletar' });
    }
  }
}
